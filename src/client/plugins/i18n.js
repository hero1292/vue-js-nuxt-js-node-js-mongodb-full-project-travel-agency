import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default ({app, store}) => {
  app.i18n = new VueI18n({
    locale: store.state.locale,
    fallbackLocale: 'ru',
    messages: {
      ru: {
        links: {
          home: 'Добро пожаловать!',
          inspire: 'Вдохновение'
        },
        main: {
          section_1: {
            title: 'ОБ АРМЕНИИ',
            description: 'Армения известна миру как колыбель цивилизации. Это красивая страна с богатой историей и культурой. ' +
            'Многие из древних и средневековых архитектурных шедевров можно найти в каждом уголке Армении. ' +
            'И все это делает Армению туристическим направлением с огромным потенциалом. Ежегодно увеличивается число гостей ' +
            'из Москвы, из СПБ, из Испании, Франции, США и других стран и городов мира. Туристические компании в свою очередь ' +
            'предлагают широкий спектр туров в Армении: индивидуальные туры, религиозные туры, гастрономические туры, активный ' +
            'туризм и приключенческие туры, комбинированные туры по Кавказу (Грузия, Армения), развлекательные туры. ' +
            'Чудесный и сказочный мир, полный приключений скрыт на земле, на которую вступил Ной и которая покрыта следами ' +
            'многовековой истории. Приезжайте за воспоминаниями, которые останутся с вами на всю жизнь.'
          },
          section_2: {
            title: 'ПОЧЕМУ С НАМИ?',
            description_1: {
              title: 'Мы предоставляем услуги наивысшего качества',
              text: 'Наша цель – гарантируя сервис лучшего качества, предоставить нашим клиентам незабываемые путешествия, ' +
              'которые превысят их ожидания. Доказательством тому является факт, что  ежегодно увеличивается число гостей из Москвы, ' +
              'из СПБ, из Испании, Франции, США и других стран и городов мира.'
            },
            description_2: {
              title: 'Мы заботимся о каждом нашем клиенте',
              text: 'В основе наших туров лежат ваши пожелания. Мы предлагаем широкий спектр туров в Армении: ' +
              'индивидуальные туры, религиозные туры, гастрономические туры, активный туризм и приключенческие туры, ' +
              'комбинированные туры по Кавказу (Грузия, Армения), развлекательные туры.'
            },
            description_3: {
              title: 'Мы лучшие в своем деле',
              text: 'Мы гордимся тем, что предлагаем отличный, быстрый и высоко профессиональный сервис, чтобы вы насладились ' +
              'вашим заслуженным отдыхом в полной мере.'
            }
          }
        },
        tours: {
          fetch: {
            headLine: {
              incoming: 'Въездные туры',
              outgoing: 'Выездные туры',
              daily: 'Ежедневные туры',
              sale: '* Продажа осуществляется только в драмах РА. Туры также можно приобрести в кредит.'
            },
            buttons: {
              all: 'Все туры',
              allDays: 'Все дни',
              category: 'Выбрать категорию',
              classic: 'Классические',
              regional: 'Региональные',
              adventure: 'Приключенческие',
              special: 'Специальные',
              winter: 'Зимние',
              budget: 'Бюджетные',
              info: 'Подробнее'
            },
            search: 'Поиск',
            searchDay: 'Выберите дату',
            date: 'Дата',
            start: 'Начало',
            price: 'Стоимость',
            priceStart: 'начиная с'
          }
        }
      },
      en: {
        links: {
          home: 'Welcome',
          inspire: 'Inspire'
        },
        main: {
          section_1: {
            title: 'ABOUT ARMENIA',
            description: 'Armenia – acknowledged as one of the cradles of civilization – is a beautiful country with a long and ' +
            'cultured history. It is an intriguing tourist destination and is recognised as one of the most safe countries ' +
            'in the world. Numerous monuments and masterpieces of the Ancient Era and Middle Ages can be found ' +
            'throughout the country! Miracles, wonders and adventures can be found on the land where Noah landed ' +
            'and traces of centuries are hidden everywhere. Gain the memories which will never leave you through our tours!'
          },
          section_2: {
            title: 'WHY WITH US?',
            description_1: {
              title: 'We provide top quality tours',
              text: 'We provide our clients with unforgettable and enjoyable travelling, with guaranteed services ' +
              'that exceed their expectations'
            },
            description_2: {
              title: 'We care for our customers',
              text: 'Our tours are completely based on your interests and schedule.'
            },
            description_3: {
              title: 'We are Simply The Best',
              text: 'We pride ourselves in offering excellent, speedy and expert service to ensure you ' +
              'will enjoy a very rewarding journey in Armenia.'
            }
          }
        },
        tours: {
          fetch: {
            headLine: {
              incoming: 'Incoming tours',
              outgoing: 'Outgoing tours',
              daily: 'Daily tours',
              sale: '* The sale is made only in Armenian drams. Tour packages can also be purchased on credit.'
            },
            buttons: {
              all: 'All tours',
              allDays: 'All days',
              category: 'Select category',
              classic: 'Classic',
              regional: 'Regional',
              adventure: 'Adventure',
              special: 'Special',
              winter: 'Winter',
              budget: 'Budget',
              info: 'More information'
            },
            search: 'Search',
            searchDay: 'Select date',
            date: 'Date',
            start: 'Start',
            price: 'Price',
            priceStart: 'starting with'
          }
        }
      },
      arm: {
        links: {
          home: 'Բարի գալուստ',
          inspire: 'Ոգեշնչեք'
        },
        main: {
          section_1: {
            title: 'ՀԱՅԱՍՏԱՆԻ ՄԱՍԻՆ',
            description: 'Հայաստանն աշխարհին հայտնի է որպես քաղաքակրթության օրրան: Սա մի գեղեցիկ երկիր է, որն ունի ' +
            'հարուստ պատմություն եւ մշակույթ: Բազմաթիվ ճարտարապետական գոհարներ կարելի է գտնել Հայաստանի յուրաքանչյուր ' +
            'անկյունում: Այդ իսկ պատճառով այն հիանալի վայր է զբոսաշրջիկների համար: Կախարդական և հրաշքներով ու արկածներով ' +
            'լի մի աշխարհ է թաքնված այն երկրում, որի ամեն մի անկյունում կարելի է գտնել դարավոր պատմության անջնջելի հետքեր։ ' +
            'Մասնակցելով տուրերի այստեղ, ձեռք կբերեք  անմոռանալի հիշողություններ:'
          },
          section_2: {
            title: 'ԻՆՉՈՒ՞ ՄԵԶ ՀԵՏ',
            description_1: {
              title: 'Մենք մատուցում ենք բարձրակարգ ծառայություններ',
              text: 'Մեր նպատակն է ապահովել մեր հաճախորդների անմոռանալի ճամփորդությունը, որը կգերազանցի իրենց ' +
              'սպասելիքները: Կազմակերպում ենք հանգիստ Հայաստանում և Հայաստանից դուրս:'
            },
            description_2: {
              title: 'Մենք հոգ ենք տանում մեր յուրաքանչյուր հյուրի մասին',
              text: 'Մեր տուրերի հիմքում ընկած են ձեր ցանկությունները։'
            },
            description_3: {
              title: 'Մենք լավագույններից մեկն ենք մեր գործում',
              text: 'Մենք հպարտ ենք, որ կարողանում ենք մատուցել անթերի, արագ և բարձրորակ ծառայություններ, ' +
              'որպեսզի դուք լիակատար վայելեք ձեր հանգիստը։'
            }
          }
        },
        tours: {
          fetch: {
            headLine: {
              incoming: 'Մուտքի տուրեր',
              outgoing: 'Արտագնա տուրեր',
              daily: 'Ամենօրյա տուրեր',
              sale: '* Վաճառքը իրականացվում է միայն ՀՀ դրամով: Տուրփաթեները վաճառվում են նաև ապառիկ տարբերակով:'
            },
            buttons: {
              all: 'Բոլոր տուրեր',
              allDays: 'Բոլոր օրերը',
              category: 'Ընտրեք կատեգորիա',
              classic: 'Դասական տուրեր',
              regional: 'Ռեգիոնալ տուրեր',
              adventure: 'Առկածահին տուրեր',
              special: 'Հատուկ տուրեր',
              winter: 'Ձմեռային տուրեր',
              budget: 'Բյուջետային տուրեր',
              info: 'Ավելին'
            },
            search: 'Որոնել',
            searchDay: 'Ընտրեք ամսաթիվը',
            date: 'Ամսաթիվ',
            start: 'Սկիզբ',
            price: 'Գին',
            priceStart: 'Գինը՝ սկսած'
          }
        }
      }
    }
  })
}
