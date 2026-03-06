// Language Toggle Function (헤더 아이콘용)
function toggleLanguage() {
    // 해시(#)를 제거하여 페이지 이동 시 항상 최상단으로 오도록 처리
    const currentUrl = window.location.href.split('#')[0];

    // 현재 파일명에 '_ko.html'이 포함되어 있으면 영문 페이지(.html)로 이동
    if (currentUrl.includes("_ko.html")) {
        window.location.href = currentUrl.replace("_ko.html", ".html");
    }
    // 현재 파일명에 '.html'만 있으면 한국어 페이지(_ko.html)로 이동
    else if (currentUrl.includes(".html")) {
        window.location.href = currentUrl.replace(".html", "_ko.html");
    }
    // 로컬 환경 등에서 주소창에 파일명이 안 보이는 기본 상태일 경우
    else {
        let newUrl = currentUrl.endsWith('/') ? currentUrl + "index_ko.html" : currentUrl + "/index_ko.html";
        window.location.href = newUrl;
    }
}

// Specific Language Set Function (푸터 텍스트용)
function setLanguage(lang) {
    const currentUrl = window.location.href.split('#')[0];

    if (lang === 'en') {
        if (currentUrl.includes("_ko.html")) {
            window.location.href = currentUrl.replace("_ko.html", ".html");
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' }); // 이미 영어 페이지면 최상단으로 스크롤
        }
    } else if (lang === 'ko') {
        if (currentUrl.includes("_ko.html")) {
            window.scrollTo({ top: 0, behavior: 'smooth' }); // 이미 한국어 페이지면 최상단으로 스크롤
        } else if (currentUrl.includes(".html")) {
            window.location.href = currentUrl.replace(".html", "_ko.html");
        } else {
            let newUrl = currentUrl.endsWith('/') ? currentUrl + "index_ko.html" : currentUrl + "/index_ko.html";
            window.location.href = newUrl;
        }
    }
}

// 2. AOS Init
AOS.init();

// 3. [수정] Swiper Init: 멈췄다가 훅 넘어가는 스냅 애니메이션 설정
var subSwiper = new Swiper(".sub1-swiper", {
    slidesPerView: 'auto',
    spaceBetween: 30,
    loop: true,
    speed: 800, // 넘어가는 시간(0.8초만에 빠르고 부드럽게)
    allowTouchMove: true,
    autoplay: {
        delay: 2500, // 2.5초 동안 대기 후 다음 슬라이드로 넘어감
        disableOnInteraction: false,
        pauseOnMouseEnter: true // 마우스 오버 시 일시정지
    },
    observer: true,
    observeParents: true,
});

// 4. District Guide Logic (English Translation)
const districtData = {
    1: {
        name: "Haeundae",
        addr: "Haeundaehaebyeon-ro, Haeundae-gu, Busan",
        tel: "+82-51-749-7611",
        time: "Open 24 Hours",
        price: "Free",
        img: "./images/sub1/sub1_disctict_pic_1.png",
        mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13047.66424173043!2d129.15008446726964!3d35.15871410718472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35688d5c0efe075f%3A0x9963b1d5c163ac98!2z7ZW07Jq064yA7ZW07IiY7JqV7J6l!5e0!3m2!1sko!2skr!4v1770711809352!5m2!1sko!2skr",
        facilities: ['pet', 'wheelchair', 'parking', 'restroom']
    },
    2: {
        name: "Gwangalli",
        addr: "219, Gwanganhaebyeon-ro, Suyeong-gu, Busan",
        tel: "+82-51-622-4251",
        time: "Open 24 Hours",
        price: "Free",
        img: "./images/sub1/sub1_disctict_pic_2.png",
        mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.648113549045!2d129.11666631524317!3d35.15300398032034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3568ecbdc0e9b46d%3A0x7d287019572977!2sGwangalli%20Beach!5e0!3m2!1sen!2skr!4v1646274000000!5m2!1sen!2skr",
        facilities: ['pet', 'wheelchair', 'parking', 'restroom']
    },
    3: {
        name: "Seomyeon",
        addr: "737, Jungang-daero, Busanjin-gu, Busan",
        tel: "+82-51-605-4522",
        time: "10:00 - 22:00",
        price: "Varies",
        img: "./images/sub1/sub1_disctict_pic_3.png",
        mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.543468530364!2d129.0556272152433!3d35.15561998031976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3568eb7a7e8e3c5b%3A0x6b8f35213612d46e!2sSeomyeon%20Station!5e0!3m2!1sen!2skr!4v1646274000000!5m2!1sen!2skr",
        facilities: ['wheelchair', 'parking', 'restroom']
    },
    4: {
        name: "Nampo",
        addr: "Jagalchi-ro, Jung-gu, Busan",
        tel: "+82-51-245-2594",
        time: "05:00 - 22:00",
        price: "Free",
        img: "./images/sub1/sub1_disctict_pic_4.png",
        mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3262.887258832145!2d129.02648731524223!3d35.09956498033405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3568e9b6a0a0a0a1%3A0x1234567890abcdef!2sNampo-dong!5e0!3m2!1sen!2skr!4v1646274000000!5m2!1sen!2skr",
        facilities: ['wheelchair', 'parking', 'restroom']
    },
    5: {
        name: "Jeonpo",
        addr: "Jeonpodaero 209-beongil, Busanjin-gu, Busan",
        tel: "+82-51-605-4522",
        time: "11:00 - 21:00",
        price: "Varies",
        img: "./images/sub1/sub1_disctict_pic_5.png",
        mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.648113549045!2d129.062000!3d35.155000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3568eb7a7e8e3c5b%3A0x6b8f35213612d46e!2sJeonpo%20Cafe%20Street!5e0!3m2!1sen!2skr!4v1646274000000!5m2!1sen!2skr",
        facilities: ['pet', 'parking', 'restroom']
    },
    6: {
        name: "Taejongdae",
        addr: "29, Taejong-ro 836-beongil, Yeongdo-gu, Busan",
        tel: "+82-51-405-2004",
        time: "04:00 - 24:00",
        price: "Free",
        img: "./images/sub1/sub1_disctict_pic_6.png",
        mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3264.448113549045!2d129.086000!3d35.053000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3568eb7a7e8e3c5b%3A0x6b8f35213612d46e!2sTaejongdae!5e0!3m2!1sen!2skr!4v1646274000000!5m2!1sen!2skr",
        facilities: ['wheelchair', 'parking', 'restroom']
    },
    7: {
        name: "Gamcheon",
        addr: "203, Gamnae 2-ro, Saha-gu, Busan",
        tel: "+82-51-204-1444",
        time: "09:00 - 18:00",
        price: "Free",
        img: "./images/sub1/sub1_disctict_pic_7.png",
        mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3262.248113549045!2d129.010000!3d35.097000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3568eb7a7e8e3c5b%3A0x6b8f35213612d46e!2sGamcheon%20Culture%20Village!5e0!3m2!1sen!2skr!4v1646274000000!5m2!1sen!2skr",
        facilities: ['pet', 'parking', 'restroom']
    }
};

function changeDistrict(id, isInit = false) {
    const data = districtData[id];
    if (!data) return;

    // 1. 메인 이미지 변경
    const mainImg = document.getElementById('dist-main-img');
    mainImg.style.opacity = 0;
    setTimeout(() => {
        mainImg.src = data.img;
        mainImg.onerror = function () { this.src = `https://placehold.co/800x500/eee/333?text=${data.name}`; };
        mainImg.style.opacity = 1;
    }, 200);

    // 2. 텍스트 정보 변경
    document.getElementById('dist-addr').innerText = data.addr;
    document.getElementById('dist-tel').innerText = data.tel;
    document.getElementById('dist-time').innerText = data.time;
    document.getElementById('dist-price').innerText = data.price;

    // 3. 지도 iframe 변경
    const mapIframe = document.getElementById('dist-map-iframe');
    if (mapIframe && data.mapSrc) {
        mapIframe.src = data.mapSrc;
    }

    // 4. 시설(Facilities) 아이콘 활성/비활성 처리
    const allFacilities = ['pet', 'wheelchair', 'parking', 'restroom'];
    allFacilities.forEach(fac => {
        const facElement = document.getElementById(`fac-${fac}`);
        if (data.facilities && data.facilities.includes(fac)) {
            facElement.classList.remove('unavailable');
        } else {
            facElement.classList.add('unavailable');
        }
    });

    // 5. 버튼 활성화 클래스 처리
    if (!isInit) {
        const listItems = document.querySelectorAll('.district_icon li');
        listItems.forEach(li => li.classList.remove('active'));
        listItems[id - 1].classList.add('active');
    }
}

// [초기화] 페이지가 로드될 때 확실하게 해운대(1번) 정보가 채워지도록 강제 호출
document.addEventListener('DOMContentLoaded', () => {
    changeDistrict(1, true);
});