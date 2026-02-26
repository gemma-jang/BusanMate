// 1. Swiper
document.addEventListener('DOMContentLoaded', function () {
    const progressLine = document.querySelector('.autoplay-progress svg');

    if (document.querySelector('.main-swiper')) {
        const mainSwiper = new Swiper(".main-swiper", {
            loop: true,
            speed: 1200,
            parallax: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false
            },
            pagination: {
                el: ".swiper-pagination",
                type: "custom",
                renderCustom: function (swiper, current, total) {
                    const cur = current < 10 ? '0' + current : current;
                    const tot = total < 10 ? '0' + total : total;
                    return `<span style="color:#fff">${cur}</span><span style="color:rgba(255,255,255,0.4); margin:0 5px;">/</span><span style="color:rgba(255,255,255,0.4)">${tot}</span>`;
                }
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },
            on: {
                autoplayTimeLeft(s, time, progress) {
                    if (progressLine) {
                        progressLine.style.setProperty("--progress", 1 - progress);
                    }
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
    try {
        updateSlide();      // Overview 슬라이드 초기화
    } catch (e) {
        console.error("Slide Init Error:", e);
    }

    try {
        animateCounters();  // 카운터 애니메이션 활성화
    } catch (e) {
        console.error("Counter Init Error:", e);
    }

    try {
        changeMateStory(0); // Mate Stories 첫 번째 데이터 로드
    } catch (e) {
        console.error("Mate Story Init Error:", e);
    }

    try { 
        startLiveUpdates();
     } catch(e) { 
        console.error("Live Update Error:", e); }
};


//  4. Overview Slider (데이터 및 함수)
const slideData = [
    {
        title: "Haedong Yonggungsa", addr: "86, Yonggung-gil, Gijang-eup", tel: "+82-51-722-7744", time: "05:00 - 20:00", price: "Free", img: "./images/main/info_img1.png", mapUrl: "https://www.google.com/maps/search/해동용궁사", siteUrl: "http://yongkungsa.or.kr/"
    },
    { title: "Haeundae Blueline Park", addr: "116, Cheongsapo-ro", tel: "+82-51-701-5548", time: "09:30 - 19:00", price: "7,000 KRW~", img: "./images/main/info_img2.png", mapUrl: "https://www.google.com/maps/search/해운대+블루라인+파크", siteUrl: "https://www.bluelinepark.com/ "},
    { title: "Gwangalli Beach", addr: "219, Gwanganhaebyeon-ro", tel: "+82-51-622-4251", time: "24 Hours", price: "Free", img: "./images/main/info_img3.png", mapUrl: "https://www.google.com/maps/search/광안리+해수욕장",  siteUrl: "https://www.suyeong.go.kr/tour/index.suyeong" },
    { title: "BEXCO", addr: "55, APEC-ro", tel: "+82-51-740-7300", time: "Event Based", price: "Varies", img: "./images/main/info_img4.png", mapUrl: "https://www.google.com/maps/search/BEXCO",  siteUrl: "https://www.bexco.co.kr/"  },
    { title: "Sajik Baseball Stadium", addr: "45, Sajik-ro", tel: "+82-51-505-7422", time: "Game Days", price: "10,000 KRW~", img: "./images/main/info_img5.png", mapUrl: "https://www.google.com/maps/search/사직야구장",  siteUrl: "https://www.giantsclub.com/" },
    { title: "Gamcheon Culture Village", addr: "203, Gamnae 2-ro", tel: "+82-51-204-1444", time: "09:00 - 18:00", price: "Free", img: "./images/main/info_img6.png", mapUrl: "https://www.google.com/maps/search/감천문화마을",  siteUrl: "https://www.gamcheon.or.kr/" }
];

let currentSlide = 5;

//  슬라이드 관련 함수들
function updateSlide() {
    if (!slideData[currentSlide]) return;
    const data = slideData[currentSlide];

    const setText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.innerText = text;
    };
    const setSrc = (id, src) => {
        const el = document.getElementById(id);
        if (el) el.src = src;
    };
    const setHref = (id, href) => {
        const el = document.getElementById(id);
        if (el) el.href = href;
    };

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

function changeOverviewSlide(index) {
    currentSlide = index;
    updateSlide();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slideData.length;
    updateSlide();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slideData.length) % slideData.length;
    updateSlide();
}





// [수정] Live Updates (섹션 내부 Slide Up 효과)
function startLiveUpdates() {
    // 1. 데이터 정의 (날씨)
    const weatherData = [
        { 
            loc: "Haeundae", temp: "22°C", img: "./images/main/haeundae.png",
            comments: [
                { user: "Sophie", flag: "usa", text: "Great weather for walking around.", time: "2 mins ago" },
                { user: "Mark", flag: "can", text: "A bit windy but sunny!", time: "11 mins ago" },
                { user: "Yuri", flag: "kor", text: "Perfect day for a picnic.", time: "1h 36m ago" }
            ]
        },
        { 
            loc: "Gwangalli", temp: "21°C", img: "./images/main/gwangalli.png", 
            comments: [
                { user: "Min-ho", flag: "kor", text: "The bridge looks amazing tonight!", time: "Now" },
                { user: "James", flag: "usa", text: "Waiting for the drone show.", time: "15 mins ago" },
                { user: "Elena", flag: "can", text: "Best night view in Busan.", time: "40 mins ago" }
            ]
        }, 
        { 
            loc: "Seomyeon", temp: "23°C", img: "./images/main/seomyeon.png", 
            comments: [
                { user: "Ken", flag: "can", text: "Shopping paradise here.", time: "5 mins ago" },
                { user: "Ji-eun", flag: "kor", text: "Found a hidden cafe alley.", time: "20 mins ago" },
                { user: "Alex", flag: "usa", text: "So much energy in the streets.", time: "55 mins ago" }
            ]
        } 
    ];

    // 2. 여행자 데이터
    const travelUpdateData = [
        [ // 그룹 A
            { name: "Mark", flag: "can", msg: "Just arrived at Gimhae Airport! Excited.", loc: "Gimhae Airport", time: "Now", img: "./images/main/user1.png" },
            { name: "Amy", flag: "usa", msg: "The coffee at Jeonpo Cafe Street is amazing.", loc: "Jeonpo", time: "5m ago", img: "./images/main/user2.png" }
        ],
        [ // 그룹 B
            { name: "Eric", flag: "usa", msg: "Hiking up Hwangnyeongsan Mountain.", loc: "Hwangnyeongsan", time: "12m ago", img: "./images/main/user3.png" }, 
            { name: "Zach", flag: "can", msg: "Trying the raw fish at Jagalchi Market!", loc: "Jagalchi", time: "30m ago", img: "./images/main/user4.png" } 
        ],
        [ // 그룹 C
            { name: "Sarah", flag: "usa", msg: "Walking through the Huinnyeoul Culture Village.", loc: "Yeongdo", time: "1h ago", img: "./images/main/user1.png" }, 
            { name: "Min-ji", flag: "kor", msg: "Enjoying the sea breeze at Taejongdae.", loc: "Taejongdae", time: "1h 20m ago", img: "./images/main/user2.png" } 
        ]
    ];

    let weatherIndex = 0;
    let travelIndex = 0;

    const weatherContainer = document.getElementById('weather-slide-wrapper');
    const travelContainer = document.getElementById('travel-slide-wrapper');

    // 공통 애니메이션 함수 (Slide Up Effect)
    const updateSectionWithSlideUp = (container, updateContentFn) => {
        if (!container) return;

        // 1. 위로 올라가며 사라짐 (Out)
        container.style.transition = "all 0.5s ease-in-out";
        container.style.transform = "translateY(-30px)"; // 위로 이동
        container.style.opacity = "0";

        // 2. 내용 교체 후 아래에서 올라옴 (In)
        setTimeout(() => {
            // 위치 리셋 (아래쪽으로 순간이동, 트랜지션 끔)
            container.style.transition = "none";
            container.style.transform = "translateY(30px)"; // 아래에서 시작 준비
            
            // 데이터 렌더링 실행
            updateContentFn();

            // 리플로우 (브라우저가 위치 변경 인식)
            void container.offsetWidth;

            // 다시 트랜지션 켜고 원래 위치로 (In)
            container.style.transition = "all 0.5s ease-in-out";
            container.style.transform = "translateY(0)";
            container.style.opacity = "1";
        }, 500); // 0.5초(사라지는 시간) 대기
    };

    setInterval(() => {
        // ---- Weather Update ----
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

        // ---- Travel Update ----
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

    }, 4000); // 4초마다 실행
}




// 5. Mate Stories Logic
const storiesData = [
    { // 0: #WithAMate
        img: "./images/main/mate_stories_photo1.png",
        name: "Sarah",
        tags: ["#WithAMate", "#BusanLife", "#GamcheonCultureVillage", "#TravelGram", "#KoreaTrip"],
        review: "Walking through Gamcheon with a local mate made the steep paths feel like a breeze!"
    },
    { // 1: #FirstTimeInBusan
        img: "./images/main/mate_stories_photo2.png",
        name: "James",
        tags: ["#FirstTimeInBusan", "#Gwangalli", "#GwanganBridge", "#NightView", "#BusanTrip"],
        review: "My first view of Gwangalli Bridge at night was absolutely breathtaking. Can't wait to come back."
    },
    { // 2: #LocalTips
        img: "./images/main/mate_stories_photo3.png",
        name: "Min-ji",
        tags: ["#LocalTips", "#DwaejiGukbap", "#Seomyeon", "#BusanFood", "#RealKorea"],
        review: "Found the best Dwaeji Gukbap alley thanks to my mate's secret list. Authentic taste!"
    },
    { // 3: #HiddenSpots
        img: "./images/main/mate_stories_photo4.png",
        name: "Alex",
        tags: ["#HiddenSpots", "#Yeongdo", "#Huinnyeoul", "#OceanCafe", "#QuietTravel"],
        review: "Exploring quiet, hidden cafés in Yeongdo was the highlight of my trip."
    },
    { // 4: #FoodWalk
        img: "./images/main/mate_stories_photo5.png",
        name: "Chen",
        tags: ["#FoodWalk", "#StreetFood", "#BIFFSquare", "#Hotteok", "#NampoDong", "#Mukbang"],
        review: "BIFF square street food is a must. The Ssiat Hotteok is truly life-changing!"
    },
    { // 5: #NightMoments
        img: "./images/main/mate_stories_photo6.png",
        name: "Elena",
        tags: ["#NightMoments", "#CableCar", "#Songdo", "#CityLights", "#RomanticBusan"],
        review: "The cable car ride at night offered the most romantic city lights I've ever seen."
    },
    { // 6: #SlowTravel
        img: "./images/main/mate_stories_photo7.png",
        name: "Yuki",
        tags: ["#SlowTravel", "#Haeundae", "#BeachWalk", "#Busking", "#HealingTime"],
        review: "Just sitting by the Haeundae shore listening to busking was enough to heal my soul."
    },
    { // 7: #UnexpectedMoments
        img: "./images/main/mate_stories_photo8.png",
        name: "Daniel",
        tags: ["#UnexpectedMoments", "#Jagalchi", "#FishMarket", "#LocalVibes", "#Seafood"],
        review: "Stumbled upon a small festival at the fish market. Pure joy and energy!"
    }
];


function changeMateStory(index) {
    const imgElement = document.getElementById('mate-story-img');
    const nameElement = document.getElementById('mate-name');
    const tagsElement = document.getElementById('mate-tags');
    const reviewElement = document.getElementById('mate-review');
    const cardInfoElement = document.getElementById('mate-card-info');

    // 버튼 활성화 상태 변경
    const buttons = document.querySelectorAll('#hashtagList .hash_btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    buttons[index].classList.add('active');

    if (!imgElement) return;

    // 페이드 아웃
    imgElement.style.opacity = 0;
    cardInfoElement.style.opacity = 0;

    setTimeout(() => {
        const data = storiesData[index];

        // 데이터 업데이트
        // 이미지 (에러시 플레이스홀더 표시)
        imgElement.src = data.img;
        imgElement.onerror = function () {
            this.src = `https://placehold.co/680x383/ccc/333?text=Story+${index + 1}`;
        };

        // 이름
        nameElement.innerText = data.name;

        // 태그 (HTML로 재구성)
        let tagsHtml = '';
        data.tags.forEach(tag => {
            tagsHtml += `<span onclick="location.href='./stories.html'">${tag}</span>`;
        });
        tagsElement.innerHTML = tagsHtml;

        // 리뷰
        reviewElement.innerText = `"${data.review}"`;

        // 페이드 인
        imgElement.style.opacity = 1;
        cardInfoElement.style.opacity = 1;
    }, 300);
}


