document.addEventListener("DOMContentLoaded", function () {
    // AOS 초기화
    AOS.init();

    // =========================================
    // 1. Swiper Hero Banner 로직 적용
    // =========================================
    const progressLine = document.querySelector('.autoplay-progress svg line');

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
                        // SVG 선 진행상태 업데이트
                        progressLine.style.setProperty("--progress", 1 - progress);
                    }
                }
            }
        });
    }

    // =========================================
    // 2. 캐릭터 섹션 IntersectionObserver (애니메이션)
    // =========================================
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 요소가 화면에 보이면 is-active 클래스 추가하여 애니메이션 시작
                entry.target.classList.add('is-active');
                // 한 번 애니메이션 후 유지하려면 다시 관찰하지 않도록 함
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 }); // 요소의 40% 정도가 보일 때 실행

    // char_1과 char_2 섹션을 관찰 대상에 추가
    const char1 = document.getElementById('char_1');
    const char2 = document.getElementById('char_2');

    if (char1) observer.observe(char1);
    if (char2) observer.observe(char2);
});