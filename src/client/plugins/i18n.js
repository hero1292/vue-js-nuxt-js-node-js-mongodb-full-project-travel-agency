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
            info: 'Подробнее',
            prev: 'Назад'
          },
          search: 'Поиск',
          searchDay: 'Выберите дату',
          date: 'Дата',
          start: 'Начало',
          end: 'Конец',
          price: 'Стоимость',
          priceStart: 'начиная с',
          time: 'Приблизительное время',
          overview: 'Обзор',
          day: 'День',
          overnight: 'Ночлег',
          priceInclude: 'Стоимость включает',
          priceExclude: 'Стоимость не включает',
          pleaseNote: 'Важно',
          typeOfTour: 'Тип тура',
          daysAndNights: 'Длительность',
          groupSize: 'Кол. человек',
          accommodation: 'Проживание',
          bestPeriod: 'Лучший период',
          startEndPoint: 'Начало/Конец',
          privateTours: {
            title: 'Экскурсии и индивидуальные туры',
            description: 'Выберите удобные для Вас по направлению и длительности экскурсии по Армении из Еревана, ' +
            'индивидуальные туры и экскурсии в Ереване Мы организуем индивидуальные экскурсионные туры в Армению, Грузию и Арцах. ' +
            'Отправьте заявку, и мы гарантируем, что Ваш отдых в Армении будет впечатляющим и незабываемым.',
            headers: {
              destination: 'Направление',
              price1: '1-3 чел.(Стоимость без гида)',
              price2: '4-7 чел.(Стоимость без гида)',
              price3: '8-18 чел.(Стоимость без гида)',
              price4: '1-3 чел.(Стоимость с гидом)',
              price5: '4-7 чел.(Стоимость с гидом)',
              price6: '8-18 чел.(Стоимость с гидом)',
              km: 'км',
              hr: 'час'
            },
            tours: {
              0: 'Тур по Еревану****',
              1: 'Эчмиадзин (Кафедральных Сабор, Св. Гаянэ, Св. Рипсимэ), Звартноц* ****',
              2: 'Сагмосаванк, Ованаванк, Мугни, Памятник армянского алфавита',
              3: 'Бюраканская обсерватория / вечерний тур /',
              4: 'Гарни*, Гегард, Симфония Камней, Арка Чаренца',
              5: 'Хор Вирап',
              6: 'Сардарапат* ****',
              7: 'Эчмиадзин (Кафедральный Собор), Сардарапат* ****, Компания МАП* ****, Храм Звартноц* ****',
              8: 'Цахкадзор*',
              9: 'Гора Арагац (Южная вершина/ 3880 метров)',
              10: 'Крепость Амберд, Озеро Кари (Гора Арагац), Памятник армянского алфавита',
              11: 'Озеро Севан, Севанаванк',
              12: 'Хор Вирап, Эчмиадзин (Кафедральных Сабор, Св. Гаянэ, Св. Рипсимэ), Звартноц* ****',
              13: 'Гарни*, Гегард, Эчмиадзин (Кафедральных Сабор, Св. Гаянэ, Св. Рипсимэ)',
              14: 'Гарни*, Гегард, Хор Вирап',
              15: 'Цахкадзор (Монастырь Кечарис), Озеро Севан (Севанаванк)',
              16: 'Гарни*, Гегард, Оз. Севан (Севанаванк)',
              17: 'Оз. Севан (Севанаванк), Норатус, Айраванк',
              18: 'Озеро Севан (Севанаванк), Дилиджан (Гошаванк, Агарцин)',
              19: 'Гюмри (тур по городу)****',
              20: 'Хор Вирап, Нораванк, Арени',
              21: 'Аруч, Талин, Гюмри****',
              22: 'Ластивер*, Озеро Севан (Севанаванк)',
              23: 'Сагмосаванк, Дендропарк*, Крепость Лори',
              24: 'Сагмосаванк, Дсех',
              25: 'Ахпат, Санаин',
              26: 'Хор Вирап, Нораванк, Арени,  Джермук',
              27: 'Ахпат, Санаин, Ахтала',
              28: 'Водопады (Джермук, Шаки)',
              29: 'Арени, Шакинский водопад, Татевский монастырь* ****',
              30: 'Арени, Нораванк, Монастырь Татев* ****, Караундж',
              31: 'Татев* ****, Хндзореск',
              32: 'Ереван, Тбилиси (тур по городу)****, Ереван',
              33: '** *** ****Ереван, Шуши, Степанакерт,  Тигранакерт, Майраберд (Аскеран), Гандзасар'
            },
            days: '3 дня / 2 ночи',
            transfer: {
              title: 'Трансфер с/до аэропорта',
              pax1: '1-3 чел.',
              pax2: '4-7 чел.',
              pax3: '8-18 чел.'
            },
            entranceFees: 'Входные билеты',
            entranceFeesText: 'Гарни - 1500AMD, Звартноц - 1300AMD, Двухторонний билет на канатную дорогу "Татевер" - 5000AMD, ' +
            'Сардарапат - 1000AMD (гид - 5000AMD), Ластивер - 1000AMD, Канатная дорога в Цахкадзоре - 2000AMD/станция, ' +
            'Дендропарк - 200AMD',
            artsakhVisa: 'Виза в Арцах - 3000АМD',
            pricesInclude: 'Цены включают',
            pricesIncludeText: 'В стоимость включены услуги водителя и гида (если выбран вариант с гидом). ' +
            'Цены не включают проживание и питание гида и водителя, проживание и питание гостей.',
            dayOff: 'Нерабочие дни',
            dayOffText: 'В понедельник закрыты: музеи, Татевская канатная дорога, Звартноц'
          }
        },
        sights: {
          headLine: 'Достопримечательности Армении',
          prev: 'Назад',
          aboutArmenia: 'Об Армении',
          search: 'Поиск',
          region: 'Регион',
          distance: 'Расстояние от Еревана',
          type: 'Тип',
          km: 'км',
          overview: 'Обзор',
          wayFromYerevan: 'Как доехать из Еревана?',
          weather: 'Погода',
          facts: 'Интересные факты',
          info: 'Подробнее'
        },
        aboutArmenia: {
          sights: 'Достопримечательности Армении',
          headLine: 'Об Армении',
          description: 'Армения – это небольшой кусочек земли, который любого влюбит в себя с первого взгляда, брошенного ' +
          'сверху из окошка самолета, с первого шага, сделанного на пропитанную солнцем землю. Армения, официальное название ' +
          'Республика Армения, расположена в северной части Армянского нагорья, между Кавказом и Малой Азией. С севера граничит ' +
          'с Грузией, на востоке с Азербайджаном, южную границу делит с Ираном, а западную с Турцией. Территория Армении ' +
          'составляет 29 800 км2  и в среднем находится на высоте от 1000 до 2500 м над уровнем моря. Мы организуем экскурсии ' +
          'по Армении, присоединившись к которым вы узнаете намного больше о нашей великой стране. Согласно официальным данным ' +
          'переписи населения 2003 года в Армении проживает около 3,3 млн жителей, 1,1 млн из которых живет в столице. ' +
          'Страна обладает очень однородным этническим составом, этнические армяне составляют 97,9% населения. ' +
          'Меньшинствами населения являются русские, езиды, ассирийцы, украинцы, греки, грузины и белорусы. У Армении есть ' +
          'очень большая диаспора; в среднем по всему миру живет 8 миллионов армян. Армения находится на той же широте что ' +
          'и Испания, Италия и Греция. Ее климат меняется от сухого субтропического до холодного горного. ' +
          'Средняя температура в июле +25 0C и -5 0C в январе. Самая высокая точка страны — гора Арагац (4090 м), ' +
          'а самая низкая точка — река Дебед (400 м). В 301 году в качестве государственной религии было принято христианство. ' +
          'Армения стала первым христианским государством мира. Армянская Апостольская церковь является национальной церковью ' +
          'армян. Армения является музеем христианства под открытым небом. Есть тысячи христианских памятников, таких как ' +
          'монастыри, церкви, часовни и хачкары, рукописи, иконы и т.д. Ереван является столицей и крупнейшим городом Армении, ' +
          'красочным, радостным, насыщенным событиями городом. Ереван имеет тысячелетнюю историю- начиная с возникновения ' +
          'древнейших цивилизаций в мире. В Ереване проводятся множество международных мероприятий- симпозиумы, конференции, ' +
          'фестивали, спортивные соревнования и многое другое. Ежегодно увеличивается число гостей из Москвы, из СПБ, из Испании, ' +
          'Франции, США и других стран и городов мира. Туристические компании в свою очередь предлагают широкий спектр туров в ' +
          'Армении: индивидуальные туры, религиозные туры, гастрономические туры, активный туризм и приключенческие туры, ' +
          'комбинированные туры по Кавказу (Грузия, Армения), развлекательные туры.',
          citation: 'Чудесный и сказочный мир, полный приключений скрыт на земле, на которую вступил Ной и которая покрыта ' +
          'следами многовековой истории. Приезжайте за воспоминаниями, которые останутся с вами на всю жизнь.',
          info: 'Информация',
          officialName: 'Официальное название:',
          officialNameText: 'Республика Армения (армянское название - Айастан)',
          government: 'Форма правления:',
          governmentText: 'Президентская Республика',
          headOfTheState: 'Глава государства:',
          headOfTheStateText: 'Президент',
          territory: 'Территория:',
          territoryText: '29.743 кв. км.',
          borders: 'Границы:',
          bordersText: 'с Грузией - 219 км; с Азербайджаном - 566 км; с Нагорным Карабахом - 221 км; с Ираном - 44 км; с ' +
          'Турцией - 311 км',
          population: 'Население:',
          populationText: 'Более 3 млн. человек',
          capital: 'Столица:',
          capitalText: 'Ереван',
          religion: 'Религия:',
          religionText: 'большинство верующих (92,6 %) принадлежат к Армянской Апостольской церкви',
          stateLanguage: 'Государственный язык:',
          stateLanguageText: 'армянский',
          administrativeDivision: 'Административное деление:',
          administrativeDivisionText: '10 областей (марзов) - Арагацотн, Арарат, Армавир, Гегаркуник, Котайк, Лори, Ширак, Сюник, ' +
          'Вайоц Дзор, Тавуш. А также столица – Ереван – отдельная административная единица',
          nationalCurrency: 'Национальная валюта:',
          nationalCurrencyText: 'Драм',
          nationalMotto: 'Национальный девиз:',
          nationalMottoText: '«Один народ, одна культура»',
          nationalSymbols: 'Государственная символика:',
          nationalSymbolsText: 'Флаг, Герб'
        },
        forms: {
          orderTour: 'Заказать тур',
          firstName: 'Имя',
          lastName: 'Фамилия',
          city: 'Город',
          country: 'Страна',
          phone: 'Телефон',
          adults: 'Взрослые',
          children: 'Дети до 4-х лет',
          dateOfArrival: 'Дата приезда',
          departureDate: 'Дата отъезда',
          notes: 'Заметки',
          close: 'Закрыть',
          ok: 'Выбрать',
          required: 'Обязательные поля',
          send: 'Отправить',
          emailRules1: 'Заполните поле E-mail',
          emailRules2: 'Заполните E-mail правильно',
          notesRules: 'Заметки должны состоять не более, чем из 500 символов',
          rules: 'Заполните поле',
          orderSuccess: 'Заказ успешно отправлен!',
          error: 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!',
          contactForm: 'Контактная форма',
          message: 'Письмо',
          messageRules1: 'Напишите Ваше письмо',
          messageRules2: 'Письмо должно состоять не более, чем из 500 символов',
          messageSuccess: 'Сообщение успешно отправлено!'
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
            info: 'More information',
            prev: 'Previous'
          },
          search: 'Search',
          searchDay: 'Select date',
          date: 'Date',
          start: 'Start',
          end: 'End',
          price: 'Price',
          priceStart: 'starting with',
          time: 'The approximate time',
          overview: 'Overview',
          day: 'Day',
          overnight: 'Overnight',
          priceInclude: 'Price includes',
          priceExclude: 'Price excludes',
          pleaseNote: 'Please Notes',
          typeOfTour: 'Type of tour',
          daysAndNights: 'Duration',
          groupSize: 'Group size',
          accommodation: 'Accommodation',
          bestPeriod: 'Best Period',
          startEndPoint: 'Start/End point',
          privateTours: {
            title: 'Private tours',
            description: 'We organize tours in Armenia, Georgia and Artsakh. Choose one of these tours and enjoy ' +
            'your trip in Armenia. Join us to discover Armenia and capital city Yerevan.',
            headers: {
              destination: 'Destination',
              price1: '1-3 pax(Price without a guide)',
              price2: '4-7 pax(Price without a guide)',
              price3: '8-18 pax(Price without a guide)',
              price4: '1-3 pax(Price with a guide)',
              price5: '4-7 pax(Price with a guide)',
              price6: '8-18 pax(Price with a guide)',
              km: 'km',
              hr: 'hr'
            },
            tours: {
              0: 'Yerevan city tour****',
              1: 'Etchmiadzin (Mother Cathedral, St. Gayane, St. Hripsime), Zvartnots Cathedral* ****',
              2: 'Saghmosavank, Hovhannavank, Mughni, Armenian Alphabet Monument',
              3: 'Byurakan Observatory* /evening tour/',
              4: 'Garni*, Geghard, "Symphony of the Stones", Charents Arch',
              5: 'Khor Virap',
              6: 'Sardarapat* ****',
              7: 'Etchmiadzin (Mother Cathedral), Sardarapat* ***, MAP company* ***, Zvartnots Cathedral* ****',
              8: 'Tsaghkadzor*',
              9: 'Mount Aragats (Southern pick/ 3880 meters)',
              10: 'Amberd Fortress, Lake Kari  (Aragats Mountain), Armenian Alphabet Monument',
              11: 'Lake Sevan, Sevanavank Monastery',
              12: 'Khor Virap, Etchmiadzin (Mother Cathedral, St. Gayane, St. Hripsime), Zvartnots Cathedral* ****',
              13: 'Garni*, Geghard, Charents Arch, Etchmiadzin (Mother Cathedral, St. Gayane, St. Hripsime)',
              14: 'Garni*, Geghard, Charents Arch, Khor Virap',
              15: 'Tsaghkadzor*, Kecharis Monastery, Lake Sevan, Sevanavank Monastery',
              16: 'Garni*, Geghard, Charents Arch, Lake Sevan (Sevanavank)',
              17: 'Lake Sevan (Sevanavank), Noratus, Hayravank',
              18: 'Lake Sevan (Sevanavank Monastery), Dilijan (Goshavank, Haghartsin)',
              19: 'Gyumri (city tour) ****',
              20: 'Khor Virap, Noravank, Areni',
              21: 'Aruch, Talin, Gyumri ****',
              22: 'Lastiver*, Lake Sevan , Sevanavank Monastery',
              23: 'Dendropark*, Lori Fortress, Saghmosavank',
              24: 'Dsegh, Saghmosavank',
              25: 'Haghpat, Sanahin',
              26: 'Khor Virap, Noravank, Areni, Jermuk',
              27: 'Haghpat, Sanahin, Akhtala',
              28: 'Waterfalls (Jermuk, Shaki)',
              29: 'Areni winery, Shaki waterfall, Tatev Monastery* ****',
              30: 'Noravank,  Areni, Karahunj, Tatev Monastery* ****',
              31: 'Tatev Monastery* ****, Khndzoresk',
              32: 'Yerevan, Tbilisi city tour****, Yerevan',
              33: '** *** ****Yerevan, Shoushi, Stepanakert, Tigranakert, Mayraberd (Askeran), Gandzasar'
            },
            days: '3 days / 2 nights',
            transfer: {
              title: 'Airport Transfer (1 way)',
              pax1: '1-3 pax',
              pax2: '4-7 pax',
              pax3: '8-18 pax'
            },
            entranceFees: 'Entrance fees',
            entranceFeesText: 'Garni - 1500AMD, Zvartnots Cathedral - 1300AMD, Tatev two-way ropeway ticket - 5000AMD, ' +
            'Sardarapat - 1000AMD (guide՝ 5000AMD), Lastiver - 1000AMD, Tsaghkazor ropeway - 2000AMD/station, Dendropark - 200AMD',
            artsakhVisa: 'Artsakh visa - 3000AMD',
            pricesInclude: 'The prices include',
            pricesIncludeText: 'The prices include a driver\'s service and a guide\'s service ' +
            '(if the option with a guide is chosen). The prices don\'t include the guide\'s and the driver\'s accommodation ' +
            'and meals, the guest\'s accommodation and meals.',
            dayOff: 'Day-off',
            dayOffText: 'Monday is a day - off for the muesums in Armenia, Tatev ropeway, Zvartnots'
          }
        },
        sights: {
          headLine: 'Sights of Armenia',
          prev: 'Previous',
          aboutArmenia: 'About Armenia',
          search: 'Search',
          region: 'Region',
          distance: 'Distance from Yerevan',
          type: 'Type',
          km: 'km',
          overview: 'Overview',
          wayFromYerevan: 'How to get?',
          weather: 'Weather',
          facts: 'Interesting facts',
          info: 'More information'
        },
        aboutArmenia: {
          sights: 'Sights of Armenia',
          headLine: 'About Armenia',
          description: 'Welcome to Armenia! Armenia, a piece land which makes everyone fall in love with it from the very first ' +
          'sight from the illuminator of an airplane, from the very first step on the sun-drenched land. You can find many ' +
          'fascinating historical and cultural sights in Armenia. Armenia, officially the Republic of Armenia, is situated in ' +
          'the northeast of the Armenian Upland between the Caucasus and Asia Minor and bordered by Georgia on the north, ' +
          'Azerbaijan on the east, Iran on the South and Turkey on the west.  Armenia has a territory of 29 800 square kilometers ' +
          'and the avarage hight is 1700 meters above sea level. According to general census of 2003 the population of Armenia ' +
          'is 3,2 million, 1.1 million of which lives in the capital. To learn more about Armenia you can join us. We organize ' +
          'tours in Armenia. The country has a very homogeneous ethnic composition, 97.9% of the population are of ethnic Armenian ' +
          'origin. Among other minorities are Russians, Yezidi, Assyrians, Ukrainians, Greeks, Georgians, and Belarusians. ' +
          'Armenia has a very large diasporas, as an average 8 million Armenians live worldwide. The country is situated on ' +
          'the same latitude as Spain, Italy and Greece. Its climate ranges from dry subtropical to cold mountain weather. ' +
          'The average temperature in July is +25 0C , and -5 0C in January.  The highest peak is mount Aragats (4090 m), ' +
          'while the lowest point is River Debed (400 m). Armenia was the first country that adopted Christianity as a state ' +
          'religion in 301 A.D. The Armenian Apostolic church is the national church of Armenians.  Armenia is an open-air museum ' +
          'of Christianity. There are thousands of Christian monuments such as monasteries, churches, chapels  and cross-stones, ' +
          'manuscripts, icons, etc. Yerevan is the capital and the largest city of Armenia, a colorful, joyful, eventful city. ' +
          'Yerevan (sometimes spelled Erevan, Erivan, Jerewan, Jerevan, etc.) has a long-long history of thousands of years, ' +
          'dating back to the rise of the oldest civilizations in the world. Yerevan is known as a host of many international ' +
          'events, such as symposia, conferences, festivals, sports competitions.',
          citation: 'Miracles, wonders and adventures can be found on the land where Noah landed and traces of centures are ' +
          'hidden everywhere. Gain the memories which will never leave you.',
          info: 'Information',
          officialName: 'Official name:',
          officialNameText: 'Republic of Armenia (Armenian - Hayastan)',
          government: 'Government:',
          governmentText: 'Presidential Republic',
          headOfTheState: 'Head of the State:',
          headOfTheStateText: 'The President',
          territory: 'Territory:',
          territoryText: '29.743 sq km',
          borders: 'Borders:',
          bordersText: 'Georgia - 219 km; Azerbaijan - 566 km; Nagorno Karabakh - 221 km; Iran - 44 km; Turkey - 311 km',
          population: 'Population:',
          populationText: 'Over 3 million',
          capital: 'Capital:',
          capitalText: 'Yerevan',
          religion: 'Religion:',
          religionText: 'The majority of believers (92.6 %) are of Armenian Apostolic Church.',
          stateLanguage: 'State Language:',
          stateLanguageText: 'Armenian',
          administrativeDivision: 'Administrative Division:',
          administrativeDivisionText: '10 regions (marzes) - Aragatsotn, Ararat, Armavir, ' +
          'Gegharkunik,Kotayk, Lori, Shirak, Syunik, Vayots Dzor, Tavush. The capital city,Yerevan, is a ' +
          'separate administrative unit',
          nationalCurrency: 'National Currency:',
          nationalCurrencyText: 'Dram',
          nationalMotto: 'National Motto:',
          nationalMottoText: '“One nation, one culture”',
          nationalSymbols: 'National Symbols:',
          nationalSymbolsText: 'Armenian Flag, Armenian Emblem'
        },
        forms: {
          orderTour: 'Book tour now',
          firstName: 'First name',
          lastName: 'Surname',
          city: 'City',
          country: 'Country',
          phone: 'Phone',
          adults: 'Adults',
          children: 'Children till 4 years old',
          dateOfArrival: 'Arrival date',
          departureDate: 'Departure date',
          notes: 'Notes',
          close: 'Close',
          ok: 'Ok',
          required: 'Indicates required field',
          send: 'Send',
          emailRules1: 'E-mail is required',
          emailRules2: 'E-mail must be valid',
          notesRules: 'Notes must be less than 500 characters',
          rules: 'This field is required',
          orderSuccess: 'Order sent successfully!',
          error: 'There was some error, reload the page and try again!',
          contactForm: 'Contact Form',
          message: 'Message',
          messageRules1: 'Message is required',
          messageRules2: 'Message must be less than 500 characters',
          messageSuccess: 'Message sent successfully!'
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
            info: 'Ավելին',
            prev: 'Նախորդ'
          },
          search: 'Որոնել',
          searchDay: 'Ընտրեք ամսաթիվը',
          date: 'Ամսաթիվ',
          start: 'Սկիզբ',
          end: 'Ավարտ',
          price: 'Գին',
          priceStart: 'Գինը՝ սկսած',
          time: 'Մոտավոր ժամ',
          overview: 'Նկարագիր',
          day: 'Օր',
          overnight: 'Գիշերակաց',
          priceInclude: 'Գինը ներառում է',
          priceExclude: 'Գինը չի ներառում',
          pleaseNote: 'Կարեւոր է',
          typeOfTour: 'Տուրի տեսակ',
          daysAndNights: 'Տեւողությունը',
          groupSize: 'Մարդկանց թիվը',
          accommodation: 'Տեղավորում',
          bestPeriod: 'Լավ սեզոն',
          startEndPoint: 'Սկիզբը/Ավարտ',
          privateTours: {
            title: 'Անհատական տուրեր եվ Էքսկուրսիաներ',
            description: 'Անհատական տուրեր և էքսկուրսիաներ Հայաստանում, Վրաստանում և Լեռնային Ղարաբաղում: ' +
            'Ընտրեք մեր տուրերը և վայելեք Ձեր ճամփորդությունը Հայաստանում: Բացահայտեք Հայաստանը և հիասքանչ մայրաքաղաք ' +
            'Երևանը մեզ հետ:',
            headers: {
              destination: 'Ուղղություն',
              price1: '1-3 մարդ(Գինն առանց էքսկուրսավարի)',
              price2: '4-7 մարդ(Գինն առանց էքսկուրսավարի)',
              price3: '8-18 մարդ(Գինն առանց էքսկուրսավարի)',
              price4: '1-3 մարդ(Գինն էքսկուրսավարով)',
              price5: '4-7 մարդ(Գինն էքսկուրսավարով)',
              price6: '8-18 մարդ(Գինն էքսկուրսավարով)',
              km: 'կմ',
              hr: 'ժամ'
            },
            tours: {
              0: 'Շրջայց Երևան քաղաքում****',
              1: 'Էջմիածին (Մայր Տաճար, Սբ. Գայանե, Սբ. Հռիփսիմե), Զվարթնոց* ****',
              2: 'Սաղմոսավանք, Հովհաննավանք, Մուղնի, Հայոց այբուբենի հուշարձան',
              3: 'Բյուրականի աստղադիտարան* /երեկոյան այց/',
              4: 'Գառնի*, Գեղարդ, Քարերի Սիմֆոնիա, Չարենցի կամար',
              5: 'Խոր Վիրապ',
              6: 'Սարդարապատ* ****',
              7: 'Էջմիածին (Մայր Տաճար), Սարդարապատ* ****, ՄԱՊ գործարան* ****, Զվարթնոց',
              8: 'Ծաղկաձոր*',
              9: 'Արագած (Հարավային գագաթ/ 3880մ)',
              10: 'Ամբերդ, Քարի լիճ (Արագած լեռ), Հայոց այբուբենի հուշարձան',
              11: 'Սևանա լիճ, Սևանավանք',
              12: 'Խոր Վիրապ, Էջմիածին (Մայր Տաճար, Սբ. Գայանե, Սբ. Հռիփսիմե), Զվարթնոց* ****',
              13: 'Գառնի*, Գեղարդ, Էջմիածին (Մայր Տաճար, Սբ. Գայանե, Սբ. Հռիփսիմե)',
              14: 'Գառնի*, Գեղարդ,Չարենցի կամար, Խոր Վիրապ',
              15: 'Ծաղկաձոր* (Կեչառիս), Սևանա լիճ (Սևանավանք)',
              16: 'Գառնի*, Գեղարդ, Սևանա լիճ (Սևանավանք)',
              17: 'Սևանա լիճ (Սևանավանք), Նորատուս, Հայրավանք',
              18: 'Սևանա լիճ (Սևանավանք), Դիլիջան (Գոշավանք, Հաղարծին)',
              19: 'Գյումրի ****',
              20: 'Խոր Վիրապ, Նորավանք, Արենի',
              21: 'Արուճ, Թալին, Գյումրի****',
              22: 'Լաստիվեր*, Սևանա լիճ (Սևանավանք)',
              23: 'Սաղմոսավանք, Դենդրոպարկ*, Լոռի բերդ',
              24: 'Սաղմոսավանք, Դսեղ',
              25: 'Հաղպատ, Սանահին',
              26: 'Խոր Վիրապ, Նորավանք, Արենի, Ջերմուկ',
              27: 'Հաղպատ, Սանահին, Ախթալա',
              28: 'Արենի, Շաքի, Տաթև* ****',
              29: 'Ջրվեժներ ( Ջերմուկ, Շաքի)',
              30: 'Նորավանք, Արենի, Տաթևի վանք* ****,  Քարահունջ',
              31: 'Տաթև* ****, Խնձորեսկ',
              32: 'Երևան, Թբիլիսի (շրջայց քաղաքում)****, Երևան',
              33: '**  *** **** Երևան, Շուշի, Ստեփանակերտ, Տիգրանակերտ, Մայրաբերդ (Ասկերան), Գանձասար'
            },
            days: '3 օր / 2 գիշեր',
            transfer: {
              title: 'Օդանավակայանի տրանսֆեր (1 ուղղություն)',
              pax1: '1-3 մարդ',
              pax2: '4-7 մարդ',
              pax3: '8-18 մարդ'
            },
            entranceFees: 'Մուտքավճարներ',
            entranceFeesText: 'Գառնի - 1500դրամ, Զվարթնոց - 1300դրամ, Տաթևի ճոպանուղու երկկողմանի տոմս - 5000դրամ, ' +
            'Սարդարապատ - 1000դրամ (գիդ՝ 5000դրամ), Լաստիվեր - 1000դրամ, Ծաղկաձորի ճոպանուղի - 2000դրամ/կայանը, ' +
            'Դենդրոպարկ - 200դրամ',
            artsakhVisa: 'Արցախի վիզա - 3000դրամ',
            pricesInclude: 'Արժեքները ներառում են',
            pricesIncludeText: 'Արժեքները ներառում են վարորդի, գիդի (եթե ընտրում եք գիդով տարբերակը) ծառայությունը: ' +
            'Չեն ներառում վարորդի և գիդի սնունդն ու գիշերակացը, հյուրերի գիշերակացն ու սնունդը:',
            dayOff: 'Ոչ աշխատանքային օրեր',
            dayOffText: 'Երկուշաբթի չեն աշխատում՝ թանգարանները, Տաթևի ճոպանուղին, Զվարթնոցի տաճարը'
          }
        },
        sights: {
          headLine: 'Տեսարժան վայրեր',
          prev: 'Նախորդ',
          aboutArmenia: 'Հայաստանի մասին',
          search: 'Որոնել',
          region: 'մարզ',
          distance: 'Հեռավորությունը Երեւանից',
          type: 'Տեսակը',
          km: 'կմ',
          overview: 'Նկարագիր',
          wayFromYerevan: 'Ինչպես հասնել Երեւանից:',
          weather: 'Եղանակը',
          facts: 'Հետաքրքիր փաստեր',
          info: 'Ավելին'
        },
        aboutArmenia: {
          sights: 'Տեսարժան վայրեր',
          headLine: 'Հայաստանի մասին',
          description: 'Բարի գալուստ Հայաստա՛ն։ Հայաստանը մի փոքրիկ հողակտոր է, որը կարողանում է յուրաքանչյուրին ստիպել սիրահարվել ' +
          'օդանավի պատուհանից նետած առաջին իսկ հայացքից, արևով սնուցված այս երկրի վրա դրված առաջին իսկ քայլից։ Հայաստանը՝ պաշտոնապես ' +
          'Հայաստանի Հանրապետությունը,  գտնվում է Հայկական բարձրավանդակի հյուսիսային մասում` Կովկասի եւ Փոքր Ասիայի միջև: ' +
          'Հյուսիսից սահմանակցում է Վրաստանի հետ, արևելքում՝ Ադրբեջանին, հարավային սահմանը կիսում է Իրանի հետ և Թուրքիայի հետ ՝ ' +
          'արեւմտյան սահմանը: Հայաստանի տարածքը կազմում է 29,800 կմ2  և  միջինը գտնվում է ծովի մակարդակից 1700 մետր ' +
          'բարձրության վրա: Հայաստանը  անձամբ բացահայտելու համար կարող եք միանալ մեզ: Մենք կազմակերպում ենք մեկօրյա տուրեր ' +
          'Հայաստանում: Ըստ 2011 թ. մարդահամարի պաշտոնական տվյալների երկրի բնակչությունը կազմում է շուրջ 3.2 միլիոն, որից 1.2 ' +
          'միլիոնը ապրում է մայրաքաղաքում: Երկիրն ունի շատ համասեռ էթնիկ կազմ. էթնիկ հայերը կազմում են  բնակչության 97.9 % , ' +
          'բնակչության փոքրամասնություն են ռուսները, եզդիները, ասորիները, ուկրաինացիները, հույները, վրացիները և բելառուսները: ' +
          'Հայաստանն ունի շատ մեծ սփյուռք: Միջին հաշվով, ամբողջ աշխարհում  10 միլիոն հայ է բնակվում: Հայաստանը գտնվում է Իսպանիայի, ' +
          'Իտալիայի և Հունաստանի հետ աշխարհագրական նույն լայնության վրա։  Երկրի կլիման տատանվում է  չոր մերձարևադարձայինից մինչև ' +
          'սառը լեռնային: Միջին ջերմաստիճանը հուլիսին +35 0C է , իսկ հունվարին՝ -5 0C : Ամենաբարձր կետը երկրում Արագած լեռան ' +
          'գագաթն է (4090 մ), իսկ ամենացածր կետը՝  Ագարակը  (350մետր): 301 թ․ քրիստոնեությունն ընդունվեց որպես պետական կրոն: ' +
          'Հայաստանը դարձավ առաջին քրիստոնյա պետությունն  աշխարհում։ Հայաստանը բաց երկնքի տակ քրիստոնեության թանգարան է: ' +
          'Կան հազարավոր քրիստոնեական հուշարձաններ, ինչպիսիք են վանքերը, եկեղեցիները, մատուռները և խաչքարերը, ձեռագրերը և այլն: ' +
          'Երևանը Հայաստանի մայրաքաղաքն ու ամենամեծ քաղաքն է՝ գունեղ, վառ, իրադարձություններով լի: Երևանն ունի հազարամյակների ' +
          'պատմություն: Երևանը մեծ ջերմությամբ հյուրընկալում  է բազմաթիվ միջազգային միջոցառումներ, ինչպիսիք են սիմպոզիումները, ' +
          'կոնֆերանսները, փառատոները, սպորտային միջոցառումները և շատ ավելին։',
          citation: 'Կախարդական և հրաշքներով ու արկածներով լի մի աշխարհ է թաքնված այն երկրում, որի վրա կանգ առավ Նոյյան տապանը, ' +
          'և որի ամեն մի անկյունում կարելի է գտնել դարավոր պատմության անջնջելի հետքեր։ Միայն հիշողություններն են, որ երբեք մեզ ' +
          'չեն լքում։',
          info: 'Տեղեկատվություն',
          officialName: 'Պաշտոնական անվանումը`',
          officialNameText: 'Հայաստանի Հանրապետություն (օտար անվանումը Արմենիա)',
          government: 'Կառավարությունը՝',
          governmentText: 'նախագահական Հանրապետություն',
          headOfTheState: 'Ղեկավարը`',
          headOfTheStateText: 'նախագահ',
          territory: 'Մակերեսը՝',
          territoryText: '29.743 քառ. կմ.',
          borders: 'Սահմանները՝',
          bordersText: 'Վրաստանի հետ - 219 կմ; Ադրբեջանի հետ 566 կմ; Լեռնային Ղարաբաղի հետ 221 կմ; Իրանի հետ44 կմ: ' +
          'Թուրքիայի հետ311 կմ',
          population: 'Բնակչությանը՝',
          populationText: 'ավելի քան 3 մլն մարդ',
          capital: 'Մայրաքաղաքը՝',
          capitalText: 'Երեւան',
          religion: 'Կրոնը՝',
          religionText: 'մեծամասնությունը հավատացյալների (92.6%) պատկանում է Հայ Առաքելական եկեղեցուն',
          stateLanguage: 'Պաշտոնական լեզուն`',
          stateLanguageText: 'հայերեն',
          administrativeDivision: 'Վարչական բաժանումները՝',
          administrativeDivisionText: '10 մարզեր - Արագածոտն, Արարատ, Արմավիր, Գեղարքունիք, Կոտայք, Լոռի, Շիրակ, Սյունիք, ' +
          'Վայոց Ձոր, Տավուշ և առանձին վարչական միավոր հանդիսացող մայրաքաղաք - Երևան - Խոշոր քաղաքներն են Երեւան, Գյումրի, ' +
          'Վանաձոր, Կապան, Արմավիր, Գավառ, Էջմիածին, Իջեւան, Հրազդան',
          nationalCurrency: 'Արժույթը`',
          nationalCurrencyText: 'դրամ',
          nationalMotto: 'Ազգային կարգախոսը՝',
          nationalMottoText: '«Մեկ ազգ, մեկ մշակույթ»',
          nationalSymbols: 'Պետական խորհրդանիշները`',
          nationalSymbolsText: 'դրոշը, զինանշանը'
        },
        forms: {
          orderTour: 'Ամրագրել տուրը',
          firstName: 'Անուն',
          lastName: 'Ազգանուն',
          city: 'Քաղաք',
          country: 'Երկիր',
          phone: 'Հեռ.',
          adults: 'Մեծահասակներ',
          children: 'Մինչև 4 տարեկան երեխաներ',
          dateOfArrival: 'Ժամանմանում',
          departureDate: 'Մեկնում',
          notes: 'Նշումներ',
          close: 'Փակել',
          ok: 'Այսօր',
          required: 'Նշում է պահանջվող դաշտը',
          send: 'Ուղարկել',
          emailRules1: 'E-mail անհրաժեշտ է',
          emailRules2: 'E-mail պետք է վավեր լինի',
          notesRules: 'Նամակ պետք է լինի 500 նիշից պակաս',
          rules: 'Այս դաշտը անհրաժեշտ է',
          orderSuccess: 'Պատվեր հաջողությամբ ուղարկվեց!',
          error: 'Կային սխալ, վերբեռնեք էջը եւ կրկին փորձեք!',
          contactForm: 'Կապի ձեւը',
          message: 'Նամակ',
          messageRules1: 'Նամակ անհրաժեշտ է',
          messageRules2: 'Նամակ պետք է լինի 500 նիշից պակաս',
          messageSuccess: 'Նամակ հաջողությամբ ուղարկվեց!'
        }
      }
    }
  })
}
