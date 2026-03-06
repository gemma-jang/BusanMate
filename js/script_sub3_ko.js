// 1. Language Toggle Function (헤더 아이콘용)
        function toggleLanguage(event) {
            if (event) event.preventDefault();
            let path = window.location.pathname;
            let file = path.split('/').pop();
            
            if (file.indexOf("_ko.html") !== -1) {
                window.location.href = file.replace("_ko.html", ".html");
            } else if (file.indexOf(".html") !== -1) {
                window.location.href = file.replace(".html", "_ko.html");
            } else {
                window.location.href = "sub3.html"; // 안전망
            }
        }

        // 2. Specific Language Set Function (푸터 텍스트용)
        function setLanguage(lang, event) {
            if (event) event.preventDefault();
            let path = window.location.pathname;
            let file = path.split('/').pop();

            if (lang === 'en') {
                if (file.indexOf("_ko.html") !== -1) {
                    window.location.href = file.replace("_ko.html", ".html");
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' }); 
                }
            } else if (lang === 'ko') {
                if (file.indexOf("_ko.html") !== -1) {
                    window.scrollTo({ top: 0, behavior: 'smooth' }); 
                } else if (file.indexOf(".html") !== -1) {
                    window.location.href = file.replace(".html", "_ko.html");
                } else {
                    window.location.href = "sub3_ko.html";
                }
            }
        }

        document.addEventListener("DOMContentLoaded", function () {
            // AOS 초기화
            AOS.init();

            // MATE 데이터베이스 (한국어 번역본)
            const matesData = [
                { id: 1, name: "🇨🇦 Abby", languages: ["영어", "한국어"], style: ["맛집 탐방", "여유로운"], interests: ["커피", "산책", "로컬 음식"], status: "Active", statusClass: "status_active", img: "./images/sub3/findamate1.png", availability: "평일" },
                { id: 2, name: "🇬🇧 Leo", languages: ["영어", "일본어"], style: ["액티비티", "자연 만끽"], interests: ["서핑", "등산", "사진 촬영"], status: "Active", statusClass: "status_active", img: "./images/sub3/findamate2.png", availability: "주말" },
                { id: 3, name: "🇹🇼 Mei", languages: ["중국어"], style: ["문화 탐방", "여유로운"], interests: ["카페 투어", "전시 관람", "독서"], status: "Away", statusClass: "status_away", img: "./images/sub3/findamate3.png", availability: "평일" },
                { id: 4, name: "🇪🇸 Carlos", languages: ["스페인어", "영어"], style: ["맛집 탐방", "산책"], interests: ["커피", "산책", "로컬 음식"], status: "Offline", statusClass: "status_offline", img: "./images/sub3/findamate4.png", availability: "언제나" },
                { id: 5, name: "🇫🇷 Sophie", languages: ["프랑스어", "영어"], style: ["나이트라이프", "럭셔리"], interests: ["펍 & 바", "야경", "쇼핑"], status: "Active", statusClass: "status_active", img: "./images/sub3/findamate5.png", availability: "주말" },
                { id: 6, name: "🇩🇪 Hans", languages: ["독일어", "영어"], style: ["역사 탐방", "문화 탐방"], interests: ["사진 촬영", "산책", "전시 관람"], status: "Active", statusClass: "status_active", img: "./images/sub3/findamate6.png", availability: "평일" },
                { id: 7, name: "🇻🇳 Minh", languages: ["베트남어", "한국어"], style: ["맛집 탐방", "로컬 라이프"], interests: ["로컬 음식", "쇼핑", "커피"], status: "Away", statusClass: "status_active", img: "./images/sub3/findamate7.png", availability: "언제나" },
                { id: 8, name: "🇷🇺 Olga", languages: ["러시아어", "영어"], style: ["모험", "액티비티"], interests: ["등산", "바다", "일몰"], status: "Active", statusClass: "status_active", img: "./images/sub3/findamate8.png", availability: "주말" },
                { id: 9, name: "🇧🇷 Pedro", languages: ["포르투갈어", "스페인어"], style: ["나이트라이프", "액티비티"], interests: ["펍 & 바", "서핑", "바다"], status: "Offline", statusClass: "status_offline", img: "./images/sub3/findamate9.png", availability: "주말" },
                { id: 10, name: "🇮🇹 Luca", languages: ["이탈리아어", "영어"], style: ["맛집 탐방", "럭셔리"], interests: ["커피", "로컬 음식", "전시 관람"], status: "Active", statusClass: "status_active", img: "./images/sub3/findamate10.png", availability: "평일" },
                { id: 11, name: "🇹🇭 Som", languages: ["태국어", "영어"], style: ["쇼핑", "여유로운"], interests: ["쇼핑", "카페 투어", "일몰"], status: "Active", statusClass: "status_active", img: "./images/sub3/findamate11.png", availability: "언제나" },
                { id: 12, name: "🇰🇷 Jun", languages: ["한국어", "영어"], style: ["로컬 라이프", "역사 탐방"], interests: ["산책", "사진 촬영", "로컬 음식"], status: "Away", statusClass: "status_away", img: "./images/sub3/findamate12.png", availability: "주말" },
                { id: 13, name: "🇯🇵 Kenji", languages: ["일본어", "영어"], style: ["문화 탐방", "맛집 탐방"], interests: ["전시 관람", "로컬 음식", "등산"], status: "Active", statusClass: "status_active", img: "./images/sub3/findamate13.png", availability: "평일" },
                { id: 14, name: "🇺🇸 Sarah", languages: ["영어"], style: ["액티비티", "산책"], interests: ["산책", "바다", "커피"], status: "Active", statusClass: "status_active", img: "./images/sub3/findamate14.png", availability: "언제나" },
                { id: 15, name: "🇨🇳 Wei", languages: ["중국어", "영어"], style: ["쇼핑", "럭셔리"], interests: ["쇼핑", "야경", "펍 & 바"], status: "Offline", statusClass: "status_offline", img: "./images/sub3/findamate15.png", availability: "주말" },
                { id: 16, name: "🇮🇳 Rahul", languages: ["힌디어", "영어"], style: ["역사 탐방", "모험"], interests: ["사진 촬영", "산책", "등산"], status: "Active", statusClass: "status_active", img: "./images/sub3/findamate16.png", availability: "평일" },
                { id: 17, name: "🇦🇺 Emma", languages: ["영어"], style: ["액티비티", "서핑"], interests: ["서핑", "바다", "일몰"], status: "Away", statusClass: "status_away", img: "./images/sub3/findamate17.png", availability: "주말" },
                { id: 18, name: "🇲🇽 Maria", languages: ["스페인어", "영어"], style: ["맛집 탐방", "나이트라이프"], interests: ["로컬 음식", "펍 & 바", "산책"], status: "Active", statusClass: "status_active", img: "./images/sub3/findamate18.png", availability: "언제나" },
                { id: 19, name: "🇸🇪 Sven", languages: ["영어", "독일어"], style: ["여유로운", "자연 만끽"], interests: ["등산", "독서", "커피"], status: "Active", statusClass: "status_active", img: "./images/sub3/findamate19.png", availability: "평일" },
                { id: 20, name: "🇵🇱 Anna", languages: ["영어", "러시아어"], style: ["문화 탐방", "역사 탐방"], interests: ["전시 관람", "사진 촬영", "산책"], status: "Offline", statusClass: "status_offline", img: "./images/sub3/findamate20.png", availability: "주말" },
                { id: 21, name: "🇪🇬 Omar", languages: ["아랍어", "영어"], style: ["로컬 라이프", "맛집 탐방"], interests: ["로컬 음식", "커피", "일몰"], status: "Active", statusClass: "status_active", img: "./images/sub3/findamate21.png", availability: "언제나" },
                { id: 22, name: "🇮🇩 Indah", languages: ["인도네시아어", "영어"], style: ["여유로운", "쇼핑"], interests: ["쇼핑", "카페 투어", "바다"], status: "Active", statusClass: "status_active", img: "./images/sub3/findamate22.png", availability: "평일" },
                { id: 23, name: "🇳🇱 Mark", languages: ["영어", "프랑스어"], style: ["나이트라이프", "액티비티"], interests: ["펍 & 바", "야경", "서핑"], status: "Active", statusClass: "status_active", img: "./images/sub3/findamate23.png", availability: "주말" },
                { id: 24, name: "🇹🇷 Elif", languages: ["영어", "아랍어"], style: ["문화 탐방", "럭셔리"], interests: ["전시 관람", "쇼핑", "독서"], status: "Away", statusClass: "status_away", img: "./images/sub3/findamate24.png", availability: "평일" },
                { id: 25, name: "🇨🇭 Noah", languages: ["독일어", "프랑스어"], style: ["모험", "등산"], interests: ["등산", "사진 촬영", "자연"], status: "Active", statusClass: "status_active", img: "./images/sub3/findamate25.png", availability: "주말" },
                { id: 26, name: "🇵🇭 Joy", languages: ["영어"], style: ["맛집 탐방", "액티비티"], interests: ["로컬 음식", "바다", "산책"], status: "Active", statusClass: "status_active", img: "./images/sub3/findamate26.png", availability: "언제나" },
                { id: 27, name: "🇮🇷 Amir", languages: ["아랍어", "영어"], style: ["역사 탐방", "여유로운"], interests: ["독서", "커피", "산책"], status: "Offline", statusClass: "status_offline", img: "./images/sub3/findamate27.png", availability: "평일" },
                { id: 28, name: "🇧🇪 Clara", languages: ["프랑스어", "영어"], style: ["예술", "문화 탐방"], interests: ["전시 관람", "사진 촬영", "카페 투어"], status: "Active", statusClass: "status_active", img: "./images/sub3/findamate28.png", availability: "주말" },
                { id: 29, name: "🇨🇱 Diego", languages: ["스페인어", "영어"], style: ["모험", "로컬 라이프"], interests: ["등산", "로컬 음식", "일몰"], status: "Active", statusClass: "status_active", img: "./images/sub3/findamate29.png", availability: "평일" },
                { id: 30, name: "🇰🇷 Hana", languages: ["한국어", "일본어"], style: ["여유로운", "카페 투어"], interests: ["커피", "독서", "산책"], status: "Active", statusClass: "status_active", img: "./images/sub3/findamate30.png", availability: "언제나" }
            ];

            // DOM 요소 선택
            const mateGrid = document.getElementById('mateGrid');
            const langSelect = document.getElementById('langSelect');
            const styleSelect = document.getElementById('styleSelect');
            const availSelect = document.getElementById('availSelect');
            const tagBtns = document.querySelectorAll('.tag_btn');
            const resetTagsBtn = document.getElementById('resetTagsBtn');

            // 상태 변수
            let currentFilters = {
                language: '언어 선택',
                style: '여행 스타일 선택',
                availability: '시간 선택',
                interests: []
            };

            // 초기 렌더링
            renderMates(matesData);

            // 이벤트 리스너 등록
            langSelect.addEventListener('change', (e) => {
                currentFilters.language = e.target.value;
                filterMates();
            });

            styleSelect.addEventListener('change', (e) => {
                currentFilters.style = e.target.value;
                filterMates();
            });
            
            availSelect.addEventListener('change', (e) => {
                currentFilters.availability = e.target.value;
                filterMates();
            });

            // 태그 버튼 클릭 이벤트
            tagBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const value = btn.getAttribute('data-value');
                    
                    // 이미 선택된 태그를 클릭한 경우 (해제)
                    if (btn.classList.contains('active')) {
                        btn.classList.remove('active');
                        currentFilters.interests = currentFilters.interests.filter(item => item !== value);
                    } 
                    // 선택되지 않은 태그를 클릭한 경우 (선택)
                    else {
                        btn.classList.add('active');
                        currentFilters.interests.push(value);
                    }
                    filterMates();
                });
            });

            // 리셋 버튼 클릭 이벤트
            resetTagsBtn.addEventListener('click', () => {
                // 관심사 필터 초기화
                currentFilters.interests = [];
                // 모든 태그 버튼의 active 클래스 제거
                tagBtns.forEach(btn => btn.classList.remove('active'));
                // select 초기화 (옵션 선택을 기본값으로)
                langSelect.value = '언어 선택';
                styleSelect.value = '여행 스타일 선택';
                availSelect.value = '시간 선택';
                currentFilters.language = '언어 선택';
                currentFilters.style = '여행 스타일 선택';
                currentFilters.availability = '시간 선택';
                // 필터링 재실행
                filterMates();
            });

            // 필터링 함수
            function filterMates() {
                // 1단계: 필수 조건 필터링 (Language, Style, Availability)
                let filteredCandidates = matesData.filter(mate => {
                    let langMatch = true;
                    if (currentFilters.language !== '언어 선택') {
                        langMatch = mate.languages.includes(currentFilters.language);
                    }

                    let styleMatch = true;
                    if (currentFilters.style !== '여행 스타일 선택') {
                        styleMatch = mate.style.includes(currentFilters.style);
                    }
                    
                    let availMatch = true;
                    if (currentFilters.availability !== '시간 선택') {
                        if (currentFilters.availability === '언제나') {
                            availMatch = mate.availability === '언제나';
                        } else {
                            availMatch = (mate.availability === currentFilters.availability) || (mate.availability === '언제나');
                        }
                    }

                    return langMatch && styleMatch && availMatch;
                });

                // 2단계: 관심사 기반 점수 계산 및 정렬
                if (currentFilters.interests.length > 0) {
                    filteredCandidates.forEach(mate => {
                        let matchCount = 0;
                        currentFilters.interests.forEach(filterInterest => {
                            if (mate.interests.some(mateInterest => mateInterest.includes(filterInterest))) {
                                matchCount++;
                            }
                        });
                        mate.matchScore = matchCount;
                    });

                    filteredCandidates = filteredCandidates.filter(mate => mate.matchScore > 0);
                    filteredCandidates.sort((a, b) => b.matchScore - a.matchScore);
                }

                renderMates(filteredCandidates);
            }

            // 렌더링 함수
            function renderMates(data) {
                mateGrid.innerHTML = '';

                if (data.length === 0) {
                    mateGrid.innerHTML = '<div class="no_result">조건에 맞는 메이트가 없습니다.</div>';
                    return;
                }

                data.slice(0, 4).forEach(mate => {
                    const getInterestIcon = (interest) => {
                        if(interest.includes("커피") || interest.includes("카페")) return "☕";
                        if(interest.includes("음식")) return "🍽️";
                        if(interest.includes("산책")) return "🚶";
                        if(interest.includes("바다")) return "🌊";
                        if(interest.includes("서핑")) return "🏄";
                        if(interest.includes("등산")) return "🥾";
                        if(interest.includes("사진")) return "📷";
                        if(interest.includes("전시")) return "🎨";
                        if(interest.includes("독서")) return "📚";
                        if(interest.includes("펍") || interest.includes("바")) return "🍻";
                        if(interest.includes("쇼핑")) return "🛍️";
                        if(interest.includes("일몰") || interest.includes("야경")) return "🌅";
                        return "✨";
                    };

                    const cardHTML = `
                        <div class="mate_card">
                            <div class="card_top">
                                <div class="card_actions">
                                    <img src="./images/sub3/heart.png" class="action_icon action_heart" alt="like"
                                        onerror="this.src='https://placehold.co/24x24/ccc?text=H'">
                                    <img src="./images/sub3/message.png" class="action_icon action_msg" alt="msg"
                                        onerror="this.src='https://placehold.co/24x24/ccc?text=M'">
                                </div>
                                <div class="status_badge ${mate.statusClass}">
                                    <span class="status_dot"></span> ${mate.status}
                                </div>
                                <div class="profile_section">
                                    <img src="${mate.img}" class="profile_img" alt="${mate.name}"
                                        onerror="this.src='https://placehold.co/90x90/cccccc/fff?text=${mate.id}'">
                                    <div class="mate_name">${mate.name}</div>
                                    <p class="mate_lang">${mate.languages.join(' / ')}</p>
                                </div>
                            </div>
                            <div class="card_bottom">
                                ${mate.interests.slice(0, 3).map(interest => 
                                    `<div class="interest_pill">${getInterestIcon(interest)} ${interest}</div>`
                                ).join('')}
                            </div>
                        </div>
                    `;
                    mateGrid.innerHTML += cardHTML;
                });
            }

            // Notice 롤링 애니메이션 스크립트
            const noticeList = document.querySelector('.notice_list');
            const noticeItems = document.querySelectorAll('.notice_row'); 
            const itemHeight = 30; 
            let currentIndex = 0;

            if(noticeList && noticeItems.length > 1) {
                const firstClone = noticeItems[0].cloneNode(true);
                noticeList.appendChild(firstClone);

                setInterval(() => {
                    currentIndex++;
                    noticeList.style.transition = 'transform 0.5s ease-in-out';
                    noticeList.style.transform = `translateY(-${currentIndex * itemHeight}px)`;

                    if (currentIndex === noticeItems.length) {
                        setTimeout(() => {
                            noticeList.style.transition = 'none';
                            currentIndex = 0;
                            noticeList.style.transform = `translateY(0)`;
                        }, 500); 
                    }
                }, 3000); 
            }
        });