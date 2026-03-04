   // 1. Language Toggle Function (헤더 아이콘용)
        function toggleLanguage(event) {
            if (event) event.preventDefault();
            
            let currentUrl = window.location.href.split('#')[0];
            
            if (currentUrl.includes("sub2_ko.html")) {
                // 현재 한국어 -> 영어로
                window.location.href = currentUrl.replace("sub2_ko.html", "sub2.html");
            } else if (currentUrl.includes("sub2.html")) {
                // 현재 영어 -> 한국어로
                window.location.href = currentUrl.replace("sub2.html", "sub2_ko.html");
            } else {
                // 로컬 호스트나 도메인 루트 진입시
                let newUrl = currentUrl.endsWith('/') ? currentUrl + "sub2.html" : currentUrl + "/sub2.html";
                window.location.href = newUrl;
            }
        }

        // 2. Specific Language Set Function (푸터 텍스트용)
        function setLanguage(lang, event) {
            if (event) event.preventDefault();
            let currentUrl = window.location.href.split('#')[0];

            if (lang === 'en') {
                if (currentUrl.includes("sub2_ko.html")) {
                    window.location.href = currentUrl.replace("sub2_ko.html", "sub2.html");
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' }); 
                }
            } else if (lang === 'ko') {
                if (currentUrl.includes("sub2_ko.html")) {
                    window.scrollTo({ top: 0, behavior: 'smooth' }); 
                } else if (currentUrl.includes("sub2.html")) {
                    window.location.href = currentUrl.replace("sub2.html", "sub2_ko.html");
                } else {
                    let newUrl = currentUrl.endsWith('/') ? currentUrl + "sub2_ko.html" : currentUrl + "/sub2_ko.html";
                    window.location.href = newUrl;
                }
            }
        }

        
        document.addEventListener("DOMContentLoaded", function () {
            // 3. AOS 초기화
            AOS.init();

            // 4. Mate's Choice Slider Initialization
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
            });

            // 5. Local Picks 데이터 (한국어 버전)
            const localPicksData = [
                // 0: 맛집 & 카페
                [
                    {
                        img: './images/sub2/localpicks1_1.png',
                        title: '전포 카페거리',
                        desc: '작은 카페, 공방, 개성 있는 숍들이 밀집해 있는 곳.<br>여유롭게 산책하며 카페 투어를 즐기기에 완벽합니다.',
                        rating: '4.7',
                        stars: '●●●●◐',
                        review: '"느긋하게 산책하며 커피 한 잔 하기 딱 좋은 곳이에요."',
                        reviewCount: '(51)',
                        url: 'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=9b86be05-5942-4919-aec9-601ba4be91fb'
                    },
                    {
                        img: './images/sub2/localpicks1_2.png',
                        title: '화국반점',
                        desc: '오랜 역사를 자랑하는 중화요리 전문점. 간짜장과 탕수육으로 현지인들에게 오랫동안 사랑받아온 노포 맛집입니다.',
                        rating: '4.5',
                        stars: '●●●●◐',
                        review: '"추억의 맛 그대로! 간짜장 계란프라이가 정말 최고예요."',
                        reviewCount: '(21)',
                        url: 'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=ed2f738f-a979-4bc2-af38-95d4be6ff0c0'
                    },
                    {
                        img: './images/sub2/localpicks1_3.png',
                        title: '모모스 커피 본점',
                        desc: '월드 바리스타 챔피언을 배출한 부산 대표 스페셜티 커피 브랜드. 뛰어난 퀄리티의 커피를 맛볼 수 있습니다.',
                        rating: '4.9',
                        stars: '●●●●●',
                        review: '"커피 향부터 달라요. 부산 오면 무조건 들러야 하는 곳!"',
                        reviewCount: '(23)',
                        url: 'https://www.momos.co.kr/'
                    }
                ],
                // 1: 머물기 좋은 숙소
                [
                    {
                        img: './images/sub2/localpicks2_1.jpg',
                        title: '호텔 AG405',
                        desc: '광안리 해수욕장과 광안대교의 환상적인 뷰를 제공하는 모던한 호텔. 가성비와 전망을 모두 잡은 곳입니다.',
                        rating: '4.5',
                        stars: '●●●●◐',
                        review: '"밤에 보는 광안대교 뷰가 정말 황홀했어요. 가성비 최고!"',
                        reviewCount: '(120)',
                        url: 'http://ag405hotel.com/'
                    },
                    {
                        img: './images/sub2/localpicks2_2.jpg',
                        title: '라발스 호텔',
                        desc: '영도에 위치한 세련된 호텔로, 코너룸에서 바라보는 360도 오션뷰와 항구 뷰가 매우 아름답습니다.',
                        rating: '4.6',
                        stars: '●●●●◐',
                        review: '"코너룸 뷰는 정말 비교 불가입니다. 영도의 감성을 제대로 느꼈어요."',
                        reviewCount: '(215)',
                        url: 'http://www.lavalsehotel.com'
                    },
                    {
                        img: './images/sub2/localpicks2_3.jpg',
                        title: '베이몬드 호텔',
                        desc: '해운대에 위치한 부티크 호텔로 환상적인 루프탑 수영장과 카바나를 갖추고 있어 휴식하기에 완벽합니다.',
                        rating: '4.7',
                        stars: '●●●●◐',
                        review: '"루프탑 수영장이 너무 좋았고 직원분들도 정말 친절했습니다."',
                        reviewCount: '(180)',
                        url: 'http://www.baymond.co.kr/'
                    }
                ],
                // 2: 로컬 시장
                [
                    {
                        img: './images/sub2/localpicks3_1.jpg',
                        title: '자갈치 시장',
                        desc: '한국 최대의 수산시장. 활기찬 에너지를 느끼며 가장 신선한 해산물과 회를 그 자리에서 즐겨보세요.',
                        rating: '4.5',
                        stars: '●●●●◐',
                        review: '"시장의 활기가 넘쳐요! 해산물이 정말 신선하고 맛있습니다."',
                        reviewCount: '(230)',
                        url: 'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=57e7d6cf-71ed-46af-9c59-bf7293e506ab'
                    },
                    {
                        img: './images/sub2/localpicks3_2.jpg',
                        title: '국제 시장',
                        desc: '빈티지 구제 옷부터 유명한 씨앗호떡 같은 길거리 음식까지, 부산의 역사가 담긴 활기찬 시장입니다.',
                        rating: '4.6',
                        stars: '●●●●◐',
                        review: '"골목골목 구경하다 보면 시간 가는 줄 모르는 매력적인 곳이에요."',
                        reviewCount: '(185)',
                        url: 'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=325a74e5-9426-4447-a8b4-93ecfa225d3d'
                    },
                    {
                        img: './images/sub2/localpicks3_3.jpg',
                        title: '부평 깡통 야시장',
                        desc: '밤이 되면 열리는 먹거리 천국. 전 세계의 다양한 길거리 음식과 퓨전 요리를 맛볼 수 있습니다.',
                        rating: '4.7',
                        stars: '●●●●◐',
                        review: '"야시장은 필수 코스죠. 맛있는 먹거리가 너무 많아서 행복했어요!"',
                        reviewCount: '(142)',
                        url: 'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=3773180c-03d4-4f81-a675-9f5cf5eb396e'
                    }
                ],
                // 3: 소품샵 & 기념품
                [
                    {
                        img: './images/sub2/localpicks4_1.jpg',
                        title: '분홍이네',
                        desc: '전포동에 위치한 레트로 감성의 소품샵. 향수를 불러일으키는 빈티지 장난감과 아기자기한 물건들이 가득합니다.',
                        rating: '4.6',
                        stars: '●●●●◐',
                        review: '"빈티지 토이 러버들의 천국! 귀여운 아이템이 너무 많아요."',
                        reviewCount: '(85)',
                        url: 'https://www.visitbusan.net/kr/index.do?menuCd=DOM_000000201003001000&uc_seq=1964&lang_cd=kr'
                    },
                    {
                        img: './images/sub2/localpicks4_2.jpg',
                        title: '광안리 소품샵 (오랜지바다)',
                        desc: '광안리 바다를 테마로 한 수제 비누, 엽서, 액세서리 등 부산 여행을 기념할 만한 특별한 선물을 구매하기 좋습니다.',
                        rating: '4.5',
                        stars: '●●●●◐',
                        review: '"부산 바다의 감성을 그대로 담은 예쁜 엽서와 비누를 샀어요."',
                        reviewCount: '(110)',
                        url: 'https://www.visitbusan.net/kr/index.do?menuCd=DOM_000000201001001000&uc_seq=374&lang_cd=kr'
                    },
                    {
                        img: './images/sub2/localpicks4_3.jpg',
                        title: 'F1963',
                        desc: '오래된 와이어 공장이 복합문화공간으로 재탄생한 곳. 대형 서점, 갤러리, 유니크한 디자인 샵들을 둘러볼 수 있습니다.',
                        rating: '4.8',
                        stars: '●●●●●',
                        review: '"건축물 자체가 예술이에요. 희귀한 책과 전시를 구경하는 재미가 쏠쏠합니다."',
                        reviewCount: '(92)',
                        url: 'http://www.f1963.org/ko/'
                    }
                ]
            ];

            const tabs = document.querySelectorAll('.local_tabs li');
            const cards = document.querySelectorAll('.pick_card');

            // 초기 로딩 시 데이터 세팅
            function initCards() {
                const initData = localPicksData[0];
                cards.forEach((card, i) => {
                    const item = initData[i];
                    if (item) {
                        const imgElem = card.querySelector('.pick_img > img');
                        imgElem.src = item.img;
                        imgElem.alt = item.title;
                        imgElem.setAttribute('onerror', `this.src='https://placehold.co/400x300/DDDDDD/666666?text=Image+${i + 1}'`);

                        card.querySelector('.pick_info h3').textContent = item.title;
                        card.querySelector('.pick_info .desc').innerHTML = item.desc;
                        card.querySelector('.info_link').href = item.url;

                        const ratingContainer = card.querySelector('.pick_info .rating');
                        ratingContainer.innerHTML = `${item.rating} <span class="stars">${item.stars}</span> <span>${item.reviewCount}</span>`;

                        card.querySelector('.pick_info .review').textContent = item.review;
                    }
                });
            }
            initCards(); 

            tabs.forEach(tab => {
                tab.addEventListener('click', function () {
                    tabs.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');

                    const index = this.getAttribute('data-index');
                    const selectedData = localPicksData[index];

                    cards.forEach((card, i) => {
                        const item = selectedData[i];
                        if (item) {
                            const imgElem = card.querySelector('.pick_img > img');
                            imgElem.src = item.img;
                            imgElem.alt = item.title;
                            imgElem.setAttribute('onerror', `this.src='https://placehold.co/400x300/DDDDDD/666666?text=Image+${i + 1}'`);

                            card.querySelector('.pick_info h3').textContent = item.title;
                            card.querySelector('.pick_info .desc').innerHTML = item.desc;
                            card.querySelector('.info_link').href = item.url;

                            const ratingContainer = card.querySelector('.pick_info .rating');
                            ratingContainer.innerHTML = `${item.rating} <span class="stars">${item.stars}</span> <span>${item.reviewCount}</span>`;

                            card.querySelector('.pick_info .review').textContent = item.review;
                        }
                    });
                });
            });

            // 6. Dialect Gallery Slide Functionality
            const dialectImages = [
                './images/sub2/dialect1.png',
                './images/sub2/dialect2.png',
                './images/sub2/dialect3.png'
            ];
            let currentDialectIndex = 0; 

            const dialectCenterImg = document.querySelector('.gallery-center');
            const dialectBtnLeft = document.querySelector('.gallery-btn-left');
            const dialectBtnRight = document.querySelector('.gallery-btn-right');

            if (dialectCenterImg && dialectBtnLeft && dialectBtnRight) {
                dialectCenterImg.style.transition = "all 0.5s ease-in-out";
                let isAnimating = false;

                function slideDialectImage(direction) {
                    if (isAnimating) return;
                    isAnimating = true;

                    if (direction === 'next') {
                        dialectCenterImg.style.transform = "translateX(-150%) scale(0.8)";
                        dialectCenterImg.style.opacity = "0";
                    } else {
                        dialectCenterImg.style.transform = "translateX(50%) scale(0.8)";
                        dialectCenterImg.style.opacity = "0";
                    }

                    setTimeout(() => {
                        if (direction === 'next') {
                            currentDialectIndex = (currentDialectIndex + 1) % dialectImages.length;
                            dialectCenterImg.style.transition = "none"; 
                            dialectCenterImg.style.transform = "translateX(50%) scale(0.8)";
                        } else {
                            currentDialectIndex = (currentDialectIndex - 1 + dialectImages.length) % dialectImages.length;
                            dialectCenterImg.style.transition = "none";
                            dialectCenterImg.style.transform = "translateX(-150%) scale(0.8)";
                        }

                        dialectCenterImg.src = dialectImages[currentDialectIndex];

                        requestAnimationFrame(() => {
                            requestAnimationFrame(() => {
                                dialectCenterImg.style.transition = "all 0.5s ease-in-out";
                                dialectCenterImg.style.transform = "translateX(-50%) scale(1)";
                                dialectCenterImg.style.opacity = "1";

                                setTimeout(() => {
                                    isAnimating = false;
                                }, 500);
                            });
                        });

                    }, 500); 
                }

                dialectBtnRight.addEventListener('click', function () {
                    slideDialectImage('next');
                });

                dialectBtnLeft.addEventListener('click', function () {
                    slideDialectImage('prev');
                });
            }
        }); 
