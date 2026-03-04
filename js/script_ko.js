 AOS.init();

        // Language Toggle Function
        function toggleLanguage() {
            const currentPage = window.location.pathname.split("/").pop();
            if (currentPage === "index_ko.html") {
                window.location.href = "index.html";
            } else {
                window.location.href = "index_ko.html";
            }
        }

        // 1. Swiper
        document.addEventListener('DOMContentLoaded', function () {
            const progressLine = document.querySelector('.autoplay-progress svg');
            if (document.querySelector('.main-swiper')) {
                const mainSwiper = new Swiper(".main-swiper", {
                    loop: true, speed: 1200, parallax: true,
                    autoplay: { delay: 4000, disableOnInteraction: false },
                    pagination: {
                        el: ".swiper-pagination", type: "custom",
                        renderCustom: function (swiper, current, total) {
                            const cur = current < 10 ? '0' + current : current;
                            const tot = total < 10 ? '0' + total : total;
                            return `<span style="color:#fff">${cur}</span><span style="color:rgba(255,255,255,0.4); margin:0 5px;">/</span><span style="color:rgba(255,255,255,0.4)">${tot}</span>`;
                        }
                    },
                    navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
                    on: {
                        autoplayTimeLeft(s, time, progress) {
                            if (progressLine) progressLine.style.setProperty("--progress", 1 - progress);
                        }
                    }
                });
            }
        });

        // 2. Counters (숫자 애니메이션) 로직
        function animateCounters() {
            const counterSection = document.querySelector('.counter');
            if (!counterSection) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const counters = entry.target.querySelectorAll('.count span');
                        counters.forEach(counter => {
                            const targetText = counter.innerText;
                            const target = parseFloat(targetText.replace(/,/g, ''));
                            if (isNaN(target)) return;

                            const isFloat = targetText.includes('.');
                            const duration = 3000;
                            let startTime = null;

                            const step = (currentTime) => {
                                if (!startTime) startTime = currentTime;
                                const progress = Math.min((currentTime - startTime) / duration, 1);
                                const easeProgress = 1 === progress ? 1 : 1 - Math.pow(2, -10 * progress);
                                const currentVal = easeProgress * target;

                                if (isFloat) counter.innerText = currentVal.toFixed(1);
                                else counter.innerText = Math.floor(currentVal).toLocaleString();

                                if (progress < 1) window.requestAnimationFrame(step);
                                else counter.innerText = targetText;
                            };
                            window.requestAnimationFrame(step);
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            observer.observe(counterSection);
        }

        // 3. Init (초기 로드 이벤트 통합)
        window.onload = function () {
            try { updateSlide(); } catch (e) { console.error("Slide Init Error:", e); }
            try { animateCounters(); } catch (e) { console.error("Counter Init Error:", e); }
            try { changeMateStory(0); } catch (e) { console.error("Mate Story Init Error:", e); }
            try { startLiveUpdates(); } catch (e) { console.error("Live Update Error:", e); }
        };

        // 4. Overview Slider (데이터 및 함수 - 한글 번역)
        const slideData = [
            { title: "해동용궁사", addr: "부산 기장군 기장읍 용궁길 86", tel: "+82-51-722-7744", time: "05:00 - 20:00", price: "입장료 무료", img: "./images/main/info_img1.png", mapUrl: "https://www.google.com/maps/search/해동용궁사", siteUrl: "http://yongkungsa.or.kr/" },
            { title: "해운대 블루라인파크", addr: "부산 해운대구 청사포로 116", tel: "+82-51-701-5548", time: "09:30 - 19:00", price: "7,000원부터~", img: "./images/main/info_img2.png", mapUrl: "https://www.google.com/maps/search/해운대+블루라인+파크", siteUrl: "https://www.bluelinepark.com/ " },
            { title: "광안리 해수욕장", addr: "부산 수영구 광안해변로 219", tel: "+82-51-622-4251", time: "24시간 개방", price: "무료", img: "./images/main/info_img3.png", mapUrl: "https://www.google.com/maps/search/광안리+해수욕장", siteUrl: "https://www.suyeong.go.kr/tour/index.suyeong" },
            { title: "벡스코 (BEXCO)", addr: "부산 해운대구 APEC로 55", tel: "+82-51-740-7300", time: "행사 일정 참조", price: "행사별 상이", img: "./images/main/info_img4.png", mapUrl: "https://www.google.com/maps/search/BEXCO", siteUrl: "https://www.bexco.co.kr/" },
            { title: "사직야구장", addr: "부산 동래구 사직로 45", tel: "+82-51-505-7422", time: "경기 당일", price: "10,000원부터~", img: "./images/main/info_img5.png", mapUrl: "https://www.google.com/maps/search/사직야구장", siteUrl: "https://www.giantsclub.com/" },
            { title: "감천문화마을", addr: "부산 사하구 감내2로 203", tel: "+82-51-204-1444", time: "09:00 - 18:00", price: "입장료 무료", img: "./images/main/info_img6.png", mapUrl: "https://www.google.com/maps/search/감천문화마을", siteUrl: "https://www.gamcheon.or.kr/" }
        ];

        let currentSlide = 5;

        function updateSlide() {
            if (!slideData[currentSlide]) return;
            const data = slideData[currentSlide];

            const setText = (id, text) => { const el = document.getElementById(id); if (el) el.innerText = text; };
            const setSrc = (id, src) => { const el = document.getElementById(id); if (el) el.src = src; };
            const setHref = (id, href) => { const el = document.getElementById(id); if (el) el.href = href; };

            setText('slide-title', data.title);
            setText('slide-addr', data.addr);
            setText('slide-tel', data.tel);
            setText('slide-time', data.time);
            setText('slide-price', data.price);
            setSrc('slide-img', data.img);
            setHref('slide-map', data.mapUrl);
            setHref('slide-title-link', data.siteUrl);

            document.querySelectorAll('.landmark').forEach((el, index) => {
                el.classList.toggle('active', index === currentSlide);
            });
        }

        function changeOverviewSlide(index) { currentSlide = index; updateSlide(); }
        function nextSlide() { currentSlide = (currentSlide + 1) % slideData.length; updateSlide(); }
        function prevSlide() { currentSlide = (currentSlide - 1 + slideData.length) % slideData.length; updateSlide(); }


        // [수정] Live Updates (데이터 한글 번역)
        function startLiveUpdates() {
            const weatherData = [
                {
                    loc: "해운대", temp: "22°C", img: "./images/main/haeundae.png",
                    comments: [
                        { user: "Sophie", flag: "usa", text: "산책하기 너무 좋은 날씨예요.", time: "2분 전" },
                        { user: "Mark", flag: "can", text: "바람은 좀 불지만 햇살이 좋아요!", time: "11분 전" },
                        { user: "Yuri", flag: "kor", text: "피크닉하기 완벽한 날이네요.", time: "1시간 36분 전" }
                    ]
                },
                {
                    loc: "광안리", temp: "21°C", img: "./images/main/gwangalli.png",
                    comments: [
                        { user: "Minho", flag: "kor", text: "오늘 밤 광안대교 뷰 미쳤어요!", time: "방금 전" },
                        { user: "James", flag: "usa", text: "드론쇼 기다리는 중입니다.", time: "15분 전" },
                        { user: "Elena", flag: "can", text: "부산 최고의 야경이네요.", time: "40분 전" }
                    ]
                },
                {
                    loc: "서면", temp: "23°C", img: "./images/main/seomyeon.png",
                    comments: [
                        { user: "Ken", flag: "can", text: "쇼핑하기 진짜 좋네요.", time: "5분 전" },
                        { user: "Jieun", flag: "kor", text: "숨겨진 카페 골목을 찾았어요.", time: "20분 전" },
                        { user: "Alex", flag: "usa", text: "거리의 활기가 엄청나요.", time: "55분 전" }
                    ]
                }
            ];

            const travelUpdateData = [
                [
                    { name: "Mark", flag: "can", msg: "방금 김해공항 도착! 너무 기대돼요.", loc: "김해공항", time: "방금 전", img: "./images/main/user1.png" },
                    { name: "Amy", flag: "usa", msg: "전포 카페거리 커피 진짜 맛있어요.", loc: "전포동", time: "5분 전", img: "./images/main/user2.png" }
                ],
                [
                    { name: "Eric", flag: "usa", msg: "황령산 등산 중입니다.", loc: "황령산", time: "12분 전", img: "./images/main/user3.png" },
                    { name: "Zach", flag: "can", msg: "자갈치 시장에서 회 먹어보는 중!", loc: "자갈치시장", time: "30분 전", img: "./images/main/user4.png" }
                ],
                [
                    { name: "Sarah", flag: "usa", msg: "흰여울문화마을 산책 중.", loc: "영도", time: "1시간 전", img: "./images/main/user1.png" },
                    { name: "민지", flag: "kor", msg: "태종대에서 바닷바람 쐬는 중.", loc: "태종대", time: "1시간 20분 전", img: "./images/main/user2.png" }
                ]
            ];

            let weatherIndex = 0; let travelIndex = 0;
            const weatherContainer = document.getElementById('weather-slide-wrapper');
            const travelContainer = document.getElementById('travel-slide-wrapper');

            const updateSectionWithSlideUp = (container, updateContentFn) => {
                if (!container) return;
                container.style.transition = "all 0.5s ease-in-out";
                container.style.transform = "translateY(-30px)";
                container.style.opacity = "0";

                setTimeout(() => {
                    container.style.transition = "none";
                    container.style.transform = "translateY(30px)";
                    
                    updateContentFn();
                    void container.offsetWidth;
                    
                    container.style.transition = "all 0.5s ease-in-out";
                    container.style.transform = "translateY(0)";
                    container.style.opacity = "1";
                }, 500);
            };

            setInterval(() => {
                updateSectionWithSlideUp(weatherContainer, () => {
                    weatherIndex = (weatherIndex + 1) % weatherData.length;
                    const w = weatherData[weatherIndex];
                    let commentsHtml = w.comments.map(c => `
                        <li>
                            <div class="user_info"><span class="ico ico_flag flag_${c.flag}"></span> ${c.user}</div>
                            <div class="comment_text">"${c.text}"</div>
                            <span class="time_ago">${c.time}</span>
                        </li>
                    `).join('');

                    weatherContainer.innerHTML = `
                        <div class="weather_info">
                            <img src="${w.img}" alt="${w.loc}" class="location_img" onerror="this.src='https://placehold.co/48x48/81C784/FFFFFF?text=${w.loc}'">
                            <div class="location_text">
                                <h3><span class="ico ico_loc"></span> ${w.loc}</h3>
                                <span><span class="ico ico_weather"></span> ${w.temp}</span>
                            </div>
                        </div>
                        <ul class="comment_list">${commentsHtml}</ul>
                    `;
                });

                updateSectionWithSlideUp(travelContainer, () => {
                    travelIndex = (travelIndex + 1) % travelUpdateData.length;
                    const tList = travelUpdateData[travelIndex];
                    let travelHtml = tList.map(t => `
                        <div class="travel_item">
                            <img src="${t.img}" alt="${t.name}" class="user_avatar" onerror="this.src='https://placehold.co/38x38/ccc/333?text=${t.name}'">
                            <div class="travel_content">
                                <div class="travel_user"><span class="ico ico_flag flag_${t.flag}"></span> ${t.name}</div>
                                <p class="travel_msg">"${t.msg}"</p>
                                <div class="travel_meta">
                                    <span><span class="ico ico_loc_gray"></span> ${t.loc}</span>
                                    <span class="meta_badge">${t.time}</span>
                                </div>
                            </div>
                        </div>
                    `).join('');
                    travelContainer.innerHTML = travelHtml;
                });
            }, 4000);
        }

        // 5. Mate Stories Logic (한글 번역)
        const storiesData = [
            {
                img: "./images/main/mate_stories_photo1.png", name: "Sarah",
                tags: ["#메이트와함께", "#부산라이프", "#감천문화마을", "#여행스타그램", "#국내여행"],
                review: "로컬 메이트와 함께 감천문화마을을 걸으니 가파른 길도 전혀 힘들지 않았어요!"
            },
            {
                img: "./images/main/mate_stories_photo2.png", name: "James",
                tags: ["#첫부산여행", "#광안리", "#광안대교", "#야경맛집", "#부산여행"],
                review: "밤에 처음 본 광안대교는 정말 숨 막히게 아름다웠습니다. 빨리 또 오고 싶어요."
            },
            {
                img: "./images/main/mate_stories_photo3.png", name: "민지",
                tags: ["#로컬꿀팁", "#돼지국밥", "#서면맛집", "#부산먹방", "#찐맛집"],
                review: "메이트가 알려준 찐 맛집 골목에서 최고의 돼지국밥을 맛봤어요!"
            },
            {
                img: "./images/main/mate_stories_photo4.png", name: "Alex",
                tags: ["#숨은명소", "#영도카페", "#흰여울문화마을", "#오션뷰", "#조용한여행"],
                review: "영도에 숨겨진 조용한 오션뷰 카페들을 탐방한 게 이번 여행의 하이라이트였어요."
            },
            {
                img: "./images/main/mate_stories_photo5.png", name: "Chen",
                tags: ["#먹방투어", "#길거리음식", "#BIFF광장", "#씨앗호떡", "#남포동", "#부산맛집"],
                review: "BIFF 광장 길거리 음식은 필수 코스! 씨앗호떡은 정말 인생 맛입니다!"
            },
            {
                img: "./images/main/mate_stories_photo6.png", name: "Elena",
                tags: ["#야경스팟", "#해상케이블카", "#송도해수욕장", "#시티라이트", "#로맨틱부산"],
                review: "밤에 타는 송도 해상케이블카에서 본 도시의 불빛들은 정말 로맨틱했어요."
            },
            {
                img: "./images/main/mate_stories_photo7.png", name: "Yuki",
                tags: ["#느린여행", "#해운대", "#밤산책", "#버스킹", "#힐링타임"],
                review: "해운대 바닷가에 앉아 버스킹을 듣는 것만으로도 완전 힐링되는 시간이었어요."
            },
            {
                img: "./images/main/mate_stories_photo8.png", name: "Daniel",
                tags: ["#뜻밖의순간", "#자갈치시장", "#수산시장", "#로컬바이브", "#해산물파티"],
                review: "자갈치 시장에서 우연히 작은 축제를 발견했어요. 활기와 에너지가 넘치는 곳!"
            }
        ];

        function changeMateStory(index) {
            const imgElement = document.getElementById('mate-story-img');
            const nameElement = document.getElementById('mate-name');
            const tagsElement = document.getElementById('mate-tags');
            const reviewElement = document.getElementById('mate-review');
            const cardInfoElement = document.getElementById('mate-card-info');

            const buttons = document.querySelectorAll('#hashtagList .hash_btn');
            buttons.forEach(btn => btn.classList.remove('active'));
            buttons[index].classList.add('active');

            if (!imgElement) return;

            imgElement.style.opacity = 0;
            cardInfoElement.style.opacity = 0;

            setTimeout(() => {
                const data = storiesData[index];
                imgElement.src = data.img;
                imgElement.onerror = function () { this.src = `https://placehold.co/680x383/ccc/333?text=Story+${index + 1}`; };
                nameElement.innerText = data.name;

                let tagsHtml = '';
                data.tags.forEach(tag => { tagsHtml += `<span onclick="location.href='./stories.html'">${tag}</span>`; });
                tagsElement.innerHTML = tagsHtml;
                reviewElement.innerText = `"${data.review}"`;

                imgElement.style.opacity = 1;
                cardInfoElement.style.opacity = 1;
            }, 300);
        }