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

       

// MATE 데이터베이스 (Mock Data - 30 profiles) - availability 추가, Alcohol -> Pubs & Bars 수정
        const matesData = [
            { id: 1, name: "🇨🇦 Abby", languages: ["English", "Korean"], style: ["Foodie", "Relaxed"], interests: ["coffee", "Walking", "Local Food"], status: "Active", statusClass: "status_active", img: "./images/sub3/findamate1.png", availability: "Weekdays" },
            { id: 2, name: "🇬🇧 Leo", languages: ["English", "Japanese"], style: ["Active", "Nature Lover"], interests: ["Surfing", "Hiking", "Photography"], status: "Active", statusClass: "status_active", img: "./images/sub3/findamate2.png", availability: "Weekends" },
            { id: 3, name: "🇹🇼 Mei", languages: ["Chinese", "Mandarin"], style: ["Cultural", "Relaxed"], interests: ["Cafe Hopping", "Exhibitions", "Reading"], status: "Away", statusClass: "status_away", img: "./images/sub3/findamate3.png", availability: "Weekdays" },
            { id: 4, name: "🇪🇸 Carlos", languages: ["Spanish", "English"], style: ["Foodie", "Walking"], interests: ["coffee", "Walking", "Local Food"], status: "Offline", statusClass: "status_offline", img: "./images/sub3/findamate4.png", availability: "Anytime" },
            { id: 5, name: "🇫🇷 Sophie", languages: ["French", "English"], style: ["Nightlife", "Luxury"], interests: ["Pubs & Bars", "Nightview", "Shopping"], status: "Active", statusClass: "status_active", img: "./images/sub3/findamate5.png", availability: "Weekends" },
            { id: 6, name: "🇩🇪 Hans", languages: ["German", "English"], style: ["History Buff", "Cultural"], interests: ["Photography", "Walking", "Exhibitions"], status: "Active", statusClass: "status_active", img: "./images/sub3/findamate6.png", availability: "Weekdays" },
            { id: 7, name: "🇻🇳 Minh", languages: ["Vietnamese", "Korean"], style: ["Foodie", "Local Life"], interests: ["Local Food", "Shopping", "coffee"], status: "Away", statusClass: "status_active", img: "./images/sub3/findamate7.png", availability: "Anytime" },
            { id: 8, name: "🇷🇺 Olga", languages: ["Russian", "English"], style: ["Adventure", "Active"], interests: ["Hiking", "Beach", "Sunset"], status: "Active", statusClass: "status_active", img: "./images/sub3/findamate8.png", availability: "Weekends" },
            { id: 9, name: "🇧🇷 Pedro", languages: ["Portuguese", "Spanish"], style: ["Nightlife", "Active"], interests: ["Pubs & Bars", "Surfing", "Beach"], status: "Offline", statusClass: "status_offline", img: "./images/sub3/findamate9.png", availability: "Weekends" },
            { id: 10, name: "🇮🇹 Luca", languages: ["Italian", "English"], style: ["Foodie", "Luxury"], interests: ["coffee", "Local Food", "Exhibitions"], status: "Active", statusClass: "status_active", img: "./images/sub3/findamate10.png", availability: "Weekdays" },
            { id: 11, name: "🇹🇭 Som", languages: ["Thai", "English"], style: ["Shopping", "Relaxed"], interests: ["Shopping", "Cafe Hopping", "Sunset"], status: "Active", statusClass: "status_active", img: "./images/sub3/findamate11.png", availability: "Anytime" },
            { id: 12, name: "🇰🇷 Jun", languages: ["Korean", "English"], style: ["Local Life", "History Buff"], interests: ["Walking", "Photography", "Local Food"], status: "Away", statusClass: "status_away", img: "./images/sub3/findamate12.png", availability: "Weekends" },
            { id: 13, name: "🇯🇵 Kenji", languages: ["Japanese", "English"], style: ["Cultural", "Foodie"], interests: ["Exhibitions", "Local Food", "Hiking"], status: "Active", statusClass: "status_active", img: "./images/sub3/findamate13.png", availability: "Weekdays" },
            { id: 14, name: "🇺🇸 Sarah", languages: ["English"], style: ["Active", "Walking"], interests: ["Walking", "Beach", "coffee"], status: "Active", statusClass: "status_active", img: "./images/sub3/findamate14.png", availability: "Anytime" },
            { id: 15, name: "🇨🇳 Wei", languages: ["Chinese", "English"], style: ["Shopping", "Luxury"], interests: ["Shopping", "Nightview", "Pubs & Bars"], status: "Offline", statusClass: "status_offline", img: "./images/sub3/findamate15.png", availability: "Weekends" },
            { id: 16, name: "🇮🇳 Rahul", languages: ["Hindi", "English"], style: ["History Buff", "Adventure"], interests: ["Photography", "Walking", "Hiking"], status: "Active", statusClass: "status_active", img: "./images/sub3/findamate16.png", availability: "Weekdays" },
            { id: 17, name: "🇦🇺 Emma", languages: ["English"], style: ["Active", "Surfing"], interests: ["Surfing", "Beach", "Sunset"], status: "Away", statusClass: "status_away", img: "./images/sub3/findamate17.png", availability: "Weekends" },
            { id: 18, name: "🇲🇽 Maria", languages: ["Spanish", "English"], style: ["Foodie", "Nightlife"], interests: ["Local Food", "Pubs & Bars", "Walking"], status: "Active", statusClass: "status_active", img: "./images/sub3/findamate18.png", availability: "Anytime" },
            { id: 19, name: "🇸🇪 Sven", languages: ["English", "German"], style: ["Relaxed", "Nature Lover"], interests: ["Hiking", "Reading", "coffee"], status: "Active", statusClass: "status_active", img: "./images/sub3/findamate19.png", availability: "Weekdays" },
            { id: 20, name: "🇵🇱 Anna", languages: ["English", "Russian"], style: ["Cultural", "History Buff"], interests: ["Exhibitions", "Photography", "Walking"], status: "Offline", statusClass: "status_offline", img: "./images/sub3/findamate20.png", availability: "Weekends" },
            { id: 21, name: "🇪🇬 Omar", languages: ["Arabic", "English"], style: ["Local Life", "Foodie"], interests: ["Local Food", "coffee", "Sunset"], status: "Active", statusClass: "status_active", img: "./images/sub3/findamate21.png", availability: "Anytime" },
            { id: 22, name: "🇮🇩 Indah", languages: ["Indonesian", "English"], style: ["Relaxed", "Shopping"], interests: ["Shopping", "Cafe Hopping", "Beach"], status: "Active", statusClass: "status_active", img: "./images/sub3/findamate22.png", availability: "Weekdays" },
            { id: 23, name: "🇳🇱 Mark", languages: ["English", "French"], style: ["Nightlife", "Active"], interests: ["Pubs & Bars", "Nightview", "Surfing"], status: "Active", statusClass: "status_active", img: "./images/sub3/findamate23.png", availability: "Weekends" },
            { id: 24, name: "🇹🇷 Elif", languages: ["English", "Arabic"], style: ["Cultural", "Luxury"], interests: ["Exhibitions", "Shopping", "Reading"], status: "Away", statusClass: "status_away", img: "./images/sub3/findamate24.png", availability: "Weekdays" },
            { id: 25, name: "🇨🇭 Noah", languages: ["German", "French"], style: ["Adventure", "Hiking"], interests: ["Hiking", "Photography", "Nature"], status: "Active", statusClass: "status_active", img: "./images/sub3/findamate25.png", availability: "Weekends" },
            { id: 26, name: "🇵🇭 Joy", languages: ["English"], style: ["Foodie", "Active"], interests: ["Local Food", "Beach", "Walking"], status: "Active", statusClass: "status_active", img: "./images/sub3/findamate26.png", availability: "Anytime" },
            { id: 27, name: "🇮🇷 Amir", languages: ["Arabic", "English"], style: ["History Buff", "Relaxed"], interests: ["Reading", "coffee", "Walking"], status: "Offline", statusClass: "status_offline", img: "./images/sub3/findamate27.png", availability: "Weekdays" },
            { id: 28, name: "🇧🇪 Clara", languages: ["French", "English"], style: ["Art", "Cultural"], interests: ["Exhibitions", "Photography", "Cafe Hopping"], status: "Active", statusClass: "status_active", img: "./images/sub3/findamate28.png", availability: "Weekends" },
            { id: 29, name: "🇨🇱 Diego", languages: ["Spanish", "English"], style: ["Adventure", "Local Life"], interests: ["Hiking", "Local Food", "Sunset"], status: "Active", statusClass: "status_active", img: "./images/sub3/findamate29.png", availability: "Weekdays" },
            { id: 30, name: "🇰🇷 Hana", languages: ["Korean", "Japanese"], style: ["Relaxed", "Cafe Hopping"], interests: ["coffee", "Reading", "Walking"], status: "Active", statusClass: "status_active", img: "./images/sub3/findamate30.png", availability: "Anytime" }
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
            language: 'Select a language',
            style: 'Select a Travel style',
            availability: 'Select availability',
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
            // 필터링 재실행
            filterMates();
        });

        // 수정: 필터링 함수 (가중치 기반 정렬 적용)
        function filterMates() {
            // 1단계: 필수 조건 필터링 (Language, Style, Availability) - AND 조건 유지
            let filteredCandidates = matesData.filter(mate => {
                let langMatch = true;
                if (currentFilters.language !== 'Select a language') {
                    langMatch = mate.languages.includes(currentFilters.language);
                }

                let styleMatch = true;
                if (currentFilters.style !== 'Select a Travel style') {
                    styleMatch = mate.style.includes(currentFilters.style);
                }
                
                // Availability 필터링 로직:
                // "Anytime" 프로필은 언제나 가능하므로 Weekdays/Weekends 필터에도 포함됨
                // "Anytime" 필터를 선택하면 "Anytime" 프로필만 표시 (가장 유연한 친구)
                let availMatch = true;
                if (currentFilters.availability !== 'Select availability') {
                    if (currentFilters.availability === 'Anytime') {
                        // 사용자가 'Anytime'을 선택하면, 'Anytime' 가능한 친구만 보여줌
                        availMatch = mate.availability === 'Anytime';
                    } else {
                        // 사용자가 'Weekdays'나 'Weekends'를 선택하면
                        // 해당 시간 또는 'Anytime' 가능한 친구를 보여줌
                        availMatch = (mate.availability === currentFilters.availability) || (mate.availability === 'Anytime');
                    }
                }

                return langMatch && styleMatch && availMatch;
            });

            // 2단계: 관심사 기반 점수 계산 및 정렬 (Score Based Sorting)
            if (currentFilters.interests.length > 0) {
                // 각 후보에 대해 일치 점수 계산
                filteredCandidates.forEach(mate => {
                    let matchCount = 0;
                    currentFilters.interests.forEach(filterInterest => {
                        // 대소문자 구분 없이 부분 일치 확인
                        if (mate.interests.some(mateInterest => mateInterest.toLowerCase().includes(filterInterest.toLowerCase()))) {
                            matchCount++;
                        }
                    });
                    mate.matchScore = matchCount; // 임시 프로퍼티 추가
                });

                // 점수가 1점 이상인(하나라도 맞는) 사람만 필터링
                filteredCandidates = filteredCandidates.filter(mate => mate.matchScore > 0);

                // 점수 내림차순 정렬 (많이 일치할수록 위로)
                filteredCandidates.sort((a, b) => b.matchScore - a.matchScore);
            }

            renderMates(filteredCandidates);
        }

        // 렌더링 함수
        function renderMates(data) {
            mateGrid.innerHTML = '';

            if (data.length === 0) {
                mateGrid.innerHTML = '<div class="no_result">No mates found matching your criteria.</div>';
                return;
            }

            // 검색 결과 중 최대 4명까지만 표시
            data.slice(0, 4).forEach(mate => {
                // 관심사 태그 아이콘 매핑
                const getInterestIcon = (interest) => {
                    if(interest.includes("coffee") || interest.includes("Cafe")) return "☕";
                    if(interest.includes("Food")) return "🍽️";
                    if(interest.includes("Walking")) return "🚶";
                    if(interest.includes("Beach")) return "🌊";
                    if(interest.includes("Surfing")) return "🏄";
                    if(interest.includes("Hiking")) return "🥾";
                    if(interest.includes("Photo")) return "📷";
                    if(interest.includes("Exhibitions")) return "🎨";
                    if(interest.includes("Reading")) return "📚";
                    // 수정: Pubs & Bars 아이콘
                    if(interest.includes("Alcohol") || interest.includes("Pubs") || interest.includes("Bars")) return "🍻";
                    if(interest.includes("Shopping")) return "🛍️";
                    if(interest.includes("Sunset") || interest.includes("Night")) return "🌅";
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


         // 수정: Notice 롤링 애니메이션 스크립트 추가
        document.addEventListener('DOMContentLoaded', () => {
            const noticeList = document.querySelector('.notice_list');
            // notice_item 대신 notice_row를 선택하도록 수정
            const noticeItems = document.querySelectorAll('.notice_row'); 
            const itemHeight = 30; // CSS에서 설정한 높이와 동일해야 함
            let currentIndex = 0;

            if(noticeList && noticeItems.length > 1) {
                // 첫 번째 요소를 복제하여 마지막에 추가 (무한 롤링 효과를 위해)
                const firstClone = noticeItems[0].cloneNode(true);
                noticeList.appendChild(firstClone);

                setInterval(() => {
                    currentIndex++;
                    noticeList.style.transition = 'transform 0.5s ease-in-out';
                    noticeList.style.transform = `translateY(-${currentIndex * itemHeight}px)`;

                    // 마지막 요소(복제된 첫 요소)에 도달하면 애니메이션 없이 처음으로 리셋
                    if (currentIndex === noticeItems.length) {
                        setTimeout(() => {
                            noticeList.style.transition = 'none';
                            currentIndex = 0;
                            noticeList.style.transform = `translateY(0)`;
                        }, 500); // transition 시간(0.5s)과 동일하게 설정
                    }
                }, 3000); // 3초마다 롤링
            }
        });