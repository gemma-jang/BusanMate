 // AOS Init
        AOS.init();

        // Swiper Init (서브페이지 전용)
        var subSwiper = new Swiper(".sub1-swiper", {
            slidesPerView: 5,        /* 화면에 5개 보임 */
            spaceBetween: 20,        /* 슬라이드 간격 */
            loop: true,              /* 무한 반복 */
            speed: 8000,             /* 부드럽게 흐르는 속도 */
            autoplay: {
                delay: 0,            /* 딜레이 없이 계속 흐름 (Marquee 효과) */
                disableOnInteraction: false,
                reverseDirection: true, /* [중요] 왼쪽에서 오른쪽으로 흐름 */
            }
        });