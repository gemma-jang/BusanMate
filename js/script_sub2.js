document.addEventListener("DOMContentLoaded", function () {
    // Mate's Choice Slider Initialization
    var mateSwiper = new Swiper(".mateSwiper", {
        slidesPerView: 5,
        centeredSlides: true,
        spaceBetween: 0,
        loop: true,
        loopedSlides: 5,
        watchSlidesProgress: true,
        navigation: {
            nextEl: ".mate-next",
            prevEl: ".mate-prev",
        }
    }); // mateSwiper E


    const localPicksData = [
        // 0: Eats & Cafés
        [
            {
                img: './images/sub2/localpicks1_1.png',
                title: 'Jeonpo Café Street',
                desc: 'A dense mix of small cafes, studios, and indie shops.<br>Perfect for slow walks and casual cafe hopping.',
                rating: '4.7',
                stars: '●●●●◐',
                review: '"Perfect for wandering, coffee hopping, and taking it slow."',
                reviewCount: '(51)',
                url: 'https://english.visitkorea.or.kr/svc/contents/contentsView.do?vcontsId=192977'
            },
            {
                img: './images/sub2/localpicks1_2.png',
                title: 'Hwagueuk Banjeom',
                desc: 'A Busan-born specialty coffee brand recognized world wide. Known for balanced, high-quality coffee loved by locals and coffee lovers alike.',
                rating: '4.5',
                stars: '●●●●◐',
                review: '"Korean-style Chinese dishes turned out to be exactly what I was craving."',
                reviewCount: '(21)',
                url: 'https://www.visitbusan.net/en/index.do?menuCd=DOM_000000302003001000&uc_seq=2098&lang_cd=en'
            },
            {
                img: './images/sub2/localpicks1_3.png',
                title: 'Momos Coffee Bar',
                desc: 'A Busan-born specialty coffee brand recognized world wide. Known for balanced, high-quality coffee loved by locals and coffee lovers alike.',
                rating: '4.9',
                stars: '●●●●●',
                review: '"Smooth, balanced, and worth the visit!"',
                reviewCount: '(23)',
                url: 'https://www.momos.co.kr/'
            }
        ],
        // 1: Place to Stay
        [
            {
                img: './images/sub2/localpicks2_1.jpg',
                title: 'Hotel AG405',
                desc: 'A sleek, modern hotel offering stunning views of Gwangalli<br>Beach and the Diamond Bridge. Great value for the view.',
                rating: '4.5',
                stars: '●●●●◐',
                review: '"The bridge view at night is absolutely mesmerizing."',
                reviewCount: '(120)',
                url: 'http://ag405hotel.com/'
            },
            {
                img: './images/sub2/localpicks2_2.jpg',
                title: 'La Valse Hotel',
                desc: 'Located in Yeongdo, this stylish hotel offers unique<br>360-degree ocean and harbor views from its corner rooms.',
                rating: '4.6',
                stars: '●●●●◐',
                review: '"Corner room views are unmatched. Loved the Yeongdo vibe."',
                reviewCount: '(215)',
                url: 'http://www.lavalsehotel.com'
            },
            {
                img: './images/sub2/localpicks2_3.jpg',
                title: 'Baymond Hotel',
                desc: 'A boutique hotel in Haeundae with a fantastic rooftop<br>pool and cabanas. Perfect for a relaxing getaway.',
                rating: '4.7',
                stars: '●●●●◐',
                review: '"Rooftop pool was amazing, and the staff were incredibly kind."',
                reviewCount: '(180)',
                url: 'http://www.baymond.co.kr/'
            }
        ],
        // 2: Local Market
        [
            {
                img: './images/sub2/localpicks3_1.jpg',
                title: 'Jagalchi Market',
                desc: 'Korea\'s largest seafood market. Experience the vibrant<br>energy and taste the freshest sashimi right on the spot.',
                rating: '4.5',
                stars: '●●●●◐',
                review: '"Such a lively atmosphere! The seafood was incredibly fresh."',
                reviewCount: '(230)',
                url: 'https://english.visitkorea.or.kr/svc/contents/contentsView.do?vcontsId=135875'
            },
            {
                img: './images/sub2/localpicks3_2.jpg',
                title: 'Gukje Market',
                desc: 'A historic market offering everything from vintage<br>clothing to traditional street food like Ssiat Hotteok.',
                rating: '4.6',
                stars: '●●●●◐',
                review: '"You can easily spend hours getting lost in these alleys."',
                reviewCount: '(185)',
                url: 'https://english.visitkorea.or.kr/svc/contents/contentsView.do?vcontsId=133469'
            },
            {
                img: './images/sub2/localpicks3_3.jpg',
                title: 'Kkangtong Night Market',
                desc: 'Famous for its bustling night market. A paradise for<br>foodies wanting to try diverse global street foods.',
                rating: '4.7',
                stars: '●●●●◐',
                review: '"The night market is a must-visit. So many delicious choices!"',
                reviewCount: '(142)',
                url: 'https://english.visitkorea.or.kr/svc/contents/contentsView.do?menuSn=459&vcontsId=78106'
            }
        ],
        // 3: Shops & Souvenirs
        [
            {
                img: './images/sub2/localpicks4_1.jpg',
                title: 'Bunhong-ine',
                desc: 'A quirky, retro-style prop shop filled with nostalgia,<br>vintage toys, and unique cute items in Jeonpo.',
                rating: '4.6',
                stars: '●●●●◐',
                review: '"A paradise for vintage toy lovers! So many cute things."',
                reviewCount: '(85)',
                url: 'https://www.visitbusan.net/index.do?menuCd=DOM_000000301003001000&uc_seq=1964&lang_cd=en'
            },
            {
                img: './images/sub2/localpicks4_2.jpg',
                title: 'Gwangalli Gift Shop',
                desc: 'Perfect place to buy Gwangalli-themed souvenirs, including<br>handmade soaps, postcards, and beach-inspired trinkets.',
                rating: '4.5',
                stars: '●●●●◐',
                review: '"Beautiful postcards and soaps that really capture the Busan sea."',
                reviewCount: '(110)',
                url: 'https://www.visitbusan.net/en/index.do?menuCd=DOM_000000201001001000&uc_seq=374&lang_cd=en'
            },
            {
                img: './images/sub2/localpicks4_3.jpg',
                title: 'F1963',
                desc: 'A former wire factory turned cultural complex. Features<br>a massive bookstore, galleries, and unique design shops.',
                rating: '4.8',
                stars: '●●●●●',
                review: '"An architectural marvel. Loved browsing the rare books and art."',
                reviewCount: '(92)',
                url: 'http://www.f1963.org/en/'
            }
        ]
    ];

    const tabs = document.querySelectorAll('.local_tabs li');
    const cards = document.querySelectorAll('.pick_card');

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // 1. 탭 스타일 변경 (Active)
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // 2. 데이터 가져오기
            const index = this.getAttribute('data-index');
            const selectedData = localPicksData[index];

            // 3. 카드 내용 업데이트
            cards.forEach((card, i) => {
                const item = selectedData[i];
                if (item) {
                    // 이미지 업데이트 (Placehold fallback 포함)
                    const imgElem = card.querySelector('.pick_img > img');
                    imgElem.src = item.img;
                    imgElem.alt = item.title;
                    imgElem.setAttribute('onerror', `this.src='https://placehold.co/400x300/DDDDDD/666666?text=Image+${i + 1}'`);

                    // 텍스트 & URL 업데이트
                    card.querySelector('.pick_info h3').textContent = item.title;
                    card.querySelector('.pick_info .desc').innerHTML = item.desc;
                    card.querySelector('.info_link').href = item.url; // 메인 링크 업데이트

                    // 평점 업데이트
                    const ratingContainer = card.querySelector('.pick_info .rating');
                    ratingContainer.innerHTML = `${item.rating} <span class="stars">${item.stars}</span> <span>${item.reviewCount}</span>`;

                    // 리뷰 업데이트
                    card.querySelector('.pick_info .review').textContent = item.review;
                    // 리뷰 링크는 항상 '#'이므로 변경 필요 없음
                }
            });
        });
    });

    // ----------------------------------------------------
    // Dialect Gallery Slide Functionality
    // ----------------------------------------------------
    const dialectImages = [
        './images/sub2/dialect1.png',
        './images/sub2/dialect2.png',
        './images/sub2/dialect3.png'
    ];
    let currentDialectIndex = 0; // 초기값: dialect1.png (index 0)

    const dialectCenterImg = document.querySelector('.gallery-center');
    const dialectBtnLeft = document.querySelector('.gallery-btn-left');
    const dialectBtnRight = document.querySelector('.gallery-btn-right');

    // 요소가 모두 존재할 때만 이벤트 연결
    if (dialectCenterImg && dialectBtnLeft && dialectBtnRight) {

        // 슬라이드 효과를 위해 transition 설정 (CSS에 이미 있을 수 있지만 확실하게 적용)
        dialectCenterImg.style.transition = "all 0.5s ease-in-out";

        let isAnimating = false; // 중복 클릭 방지

        function slideDialectImage(direction) {
            if (isAnimating) return;
            isAnimating = true;

            // 1. 현재 이미지 슬라이드 아웃 (사라짐)
            if (direction === 'next') {
                // 왼쪽으로 사라짐
                dialectCenterImg.style.transform = "translateX(-150%) scale(0.8)";
                dialectCenterImg.style.opacity = "0";
            } else {
                // 오른쪽으로 사라짐
                dialectCenterImg.style.transform = "translateX(50%) scale(0.8)";
                dialectCenterImg.style.opacity = "0";
            }

            // 2. 이미지 교체 및 위치 리셋 (0.5s 후)
            setTimeout(() => {
                // 인덱스 업데이트
                if (direction === 'next') {
                    currentDialectIndex = (currentDialectIndex + 1) % dialectImages.length;
                    // 다음 이미지는 오른쪽에서 대기
                    dialectCenterImg.style.transition = "none"; // 애니메이션 없이 이동
                    dialectCenterImg.style.transform = "translateX(50%) scale(0.8)";
                } else {
                    currentDialectIndex = (currentDialectIndex - 1 + dialectImages.length) % dialectImages.length;
                    // 이전 이미지는 왼쪽에서 대기
                    dialectCenterImg.style.transition = "none";
                    dialectCenterImg.style.transform = "translateX(-150%) scale(0.8)";
                }

                // 소스 변경
                dialectCenterImg.src = dialectImages[currentDialectIndex];

                // 3. 새 이미지 슬라이드 인 (나타남)
                // 브라우저가 스타일 변경을 인지하도록 약간의 지연 필요
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        dialectCenterImg.style.transition = "all 0.5s ease-in-out";
                        dialectCenterImg.style.transform = "translateX(-50%) scale(1)";
                        dialectCenterImg.style.opacity = "1";

                        // 애니메이션 종료 후 플래그 해제
                        setTimeout(() => {
                            isAnimating = false;
                        }, 500);
                    });
                });

            }, 500); // transition 시간과 일치시킴
        }

        // 오른쪽 버튼 클릭 (Next)
        dialectBtnRight.addEventListener('click', function () {
            slideDialectImage('next');
        });

        // 왼쪽 버튼 클릭 (Prev)
        dialectBtnLeft.addEventListener('click', function () {
            slideDialectImage('prev');
        });
    }

}); // DOMContentLoaded E