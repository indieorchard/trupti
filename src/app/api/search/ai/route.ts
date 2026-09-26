import { NextResponse } from 'next/server';
import { searchAll, SearchResultItem } from '@/lib/db';

interface AIQueryResponse {
  query: string;
  intent: string;
  guidance_hi: string;
  guidance_en: string;
  recommendedEntities: SearchResultItem[];
}

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return NextResponse.json({ success: false, error: 'Query is required' }, { status: 400 });
    }

    const q = query.trim().toLowerCase();

    // 1. Check if LiteLLM proxy is configured in environment
    const litellmBase = process.env.LITELLM_BASE_URL || process.env.OPENAI_API_BASE;
    const litellmKey = process.env.LITELLM_API_KEY || process.env.OPENAI_API_KEY || 'sk-none';

    if (litellmBase) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2500); // 2.5s timeout for snappy UI

        const llmRes = await fetch(`${litellmBase.replace(/\/$/, '')}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${litellmKey}`
          },
          body: JSON.stringify({
            model: process.env.LITELLM_MODEL || 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: `You are Trupti AI, a Vedic scholar assistant for senior citizens. Return valid JSON only with keys: intent (short string), guidance_hi (compassionate guidance in simple Hindi, max 2 sentences), guidance_en (English translation), keywords (array of 2-3 search terms in Hindi/English to query database).`
              },
              {
                role: 'user',
                content: query
              }
            ],
            response_format: { type: 'json_object' },
            temperature: 0.2,
            max_tokens: 300
          }),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (llmRes.ok) {
          const llmData = await llmRes.json();
          const parsed = JSON.parse(llmData.choices?.[0]?.message?.content || '{}');
          const keywords = parsed.keywords || [query];
          const aggregatedResults: SearchResultItem[] = [];

          for (const kw of keywords) {
            const res = searchAll(kw);
            for (const r of res) {
              if (!aggregatedResults.some(item => item.id === r.id)) {
                aggregatedResults.push(r);
              }
            }
          }

          return NextResponse.json({
            success: true,
            source: 'litellm',
            intent: parsed.intent || 'spiritual_guidance',
            guidance_hi: parsed.guidance_hi || 'आपके प्रश्न के अनुसार पावन साधन प्रस्तुत हैं।',
            guidance_en: parsed.guidance_en || 'Here are the sacred remedies for your query.',
            results: aggregatedResults.slice(0, 8)
          });
        }
      } catch (err) {
        // Fallback to local semantic intent engine
        console.warn('LiteLLM request bypassed, using built-in Vedic intent engine:', err);
      }
    }

    // 2. High-speed Built-in Vedic Intent Resolution Engine
    let intent = 'general_search';
    let guidance_hi = 'आपके आध्यात्मिक प्रश्न हेतु शास्त्रोक्त साधन:';
    let guidance_en = 'Prescribed scriptural remedies for your spiritual query:';
    let matchedKeywords: string[] = [q];

    if (/रोग|बीमार|स्वास्थ्य|दवा|अस्पताल|आयु|ill|sick|health|disease|cure|doctor/.test(q)) {
      intent = 'health_healing';
      guidance_hi = 'स्वास्थ्य लाभ एवं आरोग्य हेतु महामृत्युंजय मंत्र, भगवान धन्वंतरि एवं वैद्यनाथ ज्योतिर्लिंग का स्मरण कल्याणकारी है।';
      guidance_en = 'For health and physical healing, chanting Maha Mrityunjaya Mantra and remembering Lord Dhanvantari and Vaidyanath Jyotirlinga is recommended.';
      matchedKeywords = ['महामृत्युंजय', 'धन्वंतरि', 'वैद्यनाथ', 'रोग'];
    } else if (/साढ़ेसाती|शनि|मंगल|दोष|राहु|केतु|कुंडली|shani|sade|manglik|dosh|saturn/.test(q)) {
      intent = 'planetary_remedy';
      guidance_hi = 'ग्रह दोष एवं साढ़ेसाती की शांति हेतु शनिवार को शनि चालीसा, हनुमान चालीसा एवं त्रयोदशी को शनि प्रदोष व्रत सर्वोत्तम है।';
      guidance_en = 'For mitigating planetary afflictions and Sade Sati, reciting Hanuman Chalisa, Shani Chalisa and observing Shani Pradosha fast is supreme.';
      matchedKeywords = ['शनि', 'हनुमान चालीसा', 'शनि शिंगणापुर', 'प्रदोष'];
    } else if (/पितृ|श्राद्ध|तर्पण|पिंडदान|मृत्यु|स्वर्ग|ancestor|shraddha|pind|tarpan|passed away|lost/.test(q)) {
      intent = 'pitru_moksha';
      guidance_hi = 'पितरों की सद्गति एवं मुक्ति हेतु विष्णुपद गया, बदरीनाथ ब्रह्म कपाल पर तर्पण एवं गरुड़ पुराण का श्रवण मोक्षप्रद है।';
      guidance_en = 'For the peaceful liberation of departed ancestors, performing Tarpana at Gaya Vishnupad, Badrinath Brahma Kapal and reading Garuda Purana is prescribed.';
      matchedKeywords = ['विष्णुपद', 'बदरीनाथ', 'गरुड़', 'श्राद्ध'];
    } else if (/तनाव|चिंता|अशांति|अनिद्रा|भय|डर|peace|mental|anxiety|stress|depress|fear/.test(q)) {
      intent = 'mental_peace';
      guidance_hi = 'मानसिक शांति व चिंता निवारण हेतु वैदिक शांति पाठ, गायत्री मंत्र एवं अष्टावक्र गीता का चिंतन मन को तुरंत स्थिरता देता है।';
      guidance_en = 'To dissolve anxiety and attain peace of mind, Vedic Shanti Path, Gayatri Japa and contemplation of Ashtavakra Gita grant immediate tranquility.';
      matchedKeywords = ['शांति पाठ', 'गायत्री', 'अष्टावक्र', 'ध्यान'];
    } else if (/धन|लक्ष्मी|दरिद्रता|व्यापार|विघ्न|कामयाबी|wealth|money|prosperity|success|obstacle/.test(q)) {
      intent = 'prosperity_success';
      guidance_hi = 'विघ्न हरण व सुख-समृद्धि हेतु श्री गणेश संकटनाशन स्तोत्र, कनकधारा स्तोत्र एवं सिद्धिविनायक का दर्शन फलदायी है।';
      guidance_en = 'To clear obstacles and invite auspicious prosperity, recite Sankatnashan Ganesha Stotra, Kanakadhara Stotra, and seek blessings of Siddhivinayak.';
      matchedKeywords = ['गणेश', 'महालक्ष्मी', 'सिद्धिविनायक', 'कनकधारा'];
    } else if (/शिव|महादेव|भोलेनाथ|shiva|mahadev|bholenath/.test(q)) {
      intent = 'shaiva_bhakti';
      guidance_hi = 'देवाधिदेव महादेव की प्रसन्नता हेतु महामृत्युंजय मंत्र, शिव तांडव स्तोत्र, द्वादश ज्योतिर्लिंग व प्रदोष व्रत श्रेष्ठ हैं।';
      guidance_en = 'For Lord Shiva’s grace, Maha Mrityunjaya Mantra, Shiva Tandava Stotra, the 12 Jyotirlingas, and Pradosha fasting are foremost.';
      matchedKeywords = ['शिव', 'महादेव', 'ज्योतिर्लिंग', 'महामृत्युंजय'];
    } else if (/कृष्ण|गोविंद|बांके बिहारी|krishna|radha|vrindavan/.test(q)) {
      intent = 'vaishnava_krishna';
      guidance_hi = 'भगवान श्रीकृष्ण की शरणागति हेतु श्रीमद्भगवद्गीता, हरे कृष्ण महामंत्र, द्वारकाधीश व बांके बिहारी मंदिर के दर्शन परम कल्याणकारी हैं।';
      guidance_en = 'To surrender to Lord Krishna, immerse in Srimad Bhagavad Gita, the Hare Krishna Mahamantra, and holy shrines of Dwarka and Vrindavan.';
      matchedKeywords = ['कृष्ण', 'भगवद्गीता', 'द्वारकाधीश', 'आरती कुंजबिहारी'];
    } else if (/राम|अयोध्या|हनुमान|rama|ayodhya|hanuman/.test(q)) {
      intent = 'rama_hanuman';
      guidance_hi = 'प्रभु श्री राम एवं संकटमोचन हनुमान जी की कृपा हेतु श्री राम स्तुति, हनुमान चालीसा, सुंदरकांड व अयोध्या राम मंदिर पावन हैं।';
      guidance_en = 'For the divine protection of Lord Rama and Hanuman, recite Hanuman Chalisa, Sri Rama Stuti, and contemplate Ayodhya Ram Mandir.';
      matchedKeywords = ['राम', 'हनुमान', 'अयोध्या', 'सुंदरकांड'];
    }

    const aggregatedResults: SearchResultItem[] = [];
    for (const kw of matchedKeywords) {
      const res = searchAll(kw);
      for (const r of res) {
        if (!aggregatedResults.some(item => item.id === r.id)) {
          aggregatedResults.push(r);
        }
      }
    }

    // Fallback search if empty
    if (aggregatedResults.length === 0) {
      const directRes = searchAll(q);
      aggregatedResults.push(...directRes);
    }

    return NextResponse.json({
      success: true,
      source: 'local_vedic_engine',
      intent,
      guidance_hi,
      guidance_en,
      results: aggregatedResults.slice(0, 10)
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
