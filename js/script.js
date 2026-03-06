 AOS.init();

        // Language Toggle Function 
        function toggleLanguage() {
            const pathName = window.location.pathname;
            const fileName = pathName.substring(pathName.lastIndexOf('/') + 1);
            
            if (fileName === "index_ko.html") {
                window.location.href = pathName.replace("index_ko.html", "index.html");
            } 
            else {
                if (fileName === "index.html") {
                    window.location.href = pathName.replace("index.html", "index_ko.html");
                } else {
                    window.location.href = pathName + "index_ko.html";
                }
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

        // 2. Counters 
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

        // 3. Init 
        window.onload = function () {
            try { updateSlide(); } catch (e) { console.error("Slide Init Error:", e); }
            try { animateCounters(); } catch (e) { console.error("Counter Init Error:", e); }
            try { changeMateStory(0); } catch (e) { console.error("Mate Story Init Error:", e); }
            try { startLiveUpdates(); } catch (e) { console.error("Live Update Error:", e); }
        };

        // 4. Overview Slider (English Data)
        const slideData = [
            { title: "Haedong Yonggungsa", addr: "86 Yonggung-gil, Gijang, Busan", tel: "+82-51-722-7744", time: "05:00 - 20:00", price: "Free admission", img: "./images/main/info_img1.png", mapUrl: "https://www.google.com/maps/search/Haedong+Yonggungsa", siteUrl: "http://yongkungsa.or.kr/" },
            { title: "Haeundae Blue Line Park", addr: "116 Cheongsapo-ro, Haeundae-gu", tel: "+82-51-701-5548", time: "09:30 - 19:00", price: "From 7,000 KRW", img: "./images/main/info_img2.png", mapUrl: "https://www.google.com/maps/search/Haeundae+Blue+Line+Park", siteUrl: "https://www.bluelinepark.com/ " },
            { title: "Gwangalli Beach", addr: "219 Gwanganhaebyeon-ro, Suyeong-gu", tel: "+82-51-622-4251", time: "Open 24 hours", price: "Free", img: "./images/main/info_img3.png", mapUrl: "https://www.google.com/maps/search/Gwangalli+Beach", siteUrl: "https://www.suyeong.go.kr/tour/index.suyeong" },
            { title: "BEXCO", addr: "55 APEC-ro, Haeundae-gu, Busan", tel: "+82-51-740-7300", time: "Varies by event", price: "Varies by event", img: "./images/main/info_img4.png", mapUrl: "https://www.google.com/maps/search/BEXCO", siteUrl: "https://www.bexco.co.kr/" },
            { title: "Sajik Baseball Stadium", addr: "45 Sajik-ro, Dongnae-gu, Busan", tel: "+82-51-505-7422", time: "Game days", price: "From 10,000 KRW", img: "./images/main/info_img5.png", mapUrl: "https://www.google.com/maps/search/Sajik+Baseball+Stadium", siteUrl: "https://www.giantsclub.com/" },
            { title: "Gamcheon Culture Village", addr: "203 Gamnae 2-ro, Saha-gu, Busan", tel: "+82-51-204-1444", time: "09:00 - 18:00", price: "Free admission", img: "./images/main/info_img6.png", mapUrl: "https://www.google.com/maps/search/Gamcheon+Culture+Village", siteUrl: "https://www.gamcheon.or.kr/" }
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


        // Live Updates (English Data)
        function startLiveUpdates() {
            const weatherData = [
                {
                    loc: "Haeundae", temp: "22°C", img: "./images/main/haeundae.png",
                    comments: [
                        { user: "Sophie", flag: "usa", text: "Great weather for a walk.", time: "2 mins ago" },
                        { user: "Mark", flag: "can", text: "A bit windy, but the sun is nice!", time: "11 mins ago" },
                        { user: "Yuri", flag: "kor", text: "Perfect day for a picnic.", time: "1 hr 36 mins ago" }
                    ]
                },
                {
                    loc: "Gwangalli", temp: "21°C", img: "./images/main/gwangalli.png",
                    comments: [
                        { user: "Minho", flag: "kor", text: "Gwangandaegyo Bridge view is crazy tonight!", time: "Just now" },
                        { user: "James", flag: "usa", text: "Waiting for the drone show.", time: "15 mins ago" },
                        { user: "Elena", flag: "can", text: "The best night view in Busan.", time: "40 mins ago" }
                    ]
                },
                {
                    loc: "Seomyeon", temp: "23°C", img: "./images/main/seomyeon.png",
                    comments: [
                        { user: "Ken", flag: "can", text: "Really good for shopping.", time: "5 mins ago" },
                        { user: "Jieun", flag: "kor", text: "Found a hidden cafe alley.", time: "20 mins ago" },
                        { user: "Alex", flag: "usa", text: "The street energy is amazing.", time: "55 mins ago" }
                    ]
                }
            ];

            const travelUpdateData = [
                [
                    { name: "Mark", flag: "can", msg: "Just arrived at Gimhae Airport! So excited.", loc: "Gimhae Airport", time: "Just now", img: "./images/main/user1.png" },
                    { name: "Amy", flag: "usa", msg: "The coffee at Jeonpo Cafe Street is really good.", loc: "Jeonpo-dong", time: "5 mins ago", img: "./images/main/user2.png" }
                ],
                [
                    { name: "Eric", flag: "usa", msg: "Hiking up Hwangnyeongsan Mountain.", loc: "Hwangnyeongsan", time: "12 mins ago", img: "./images/main/user3.png" },
                    { name: "Zach", flag: "can", msg: "Trying raw fish at Jagalchi Market!", loc: "Jagalchi Market", time: "30 mins ago", img: "./images/main/user4.png" }
                ],
                [
                    { name: "Sarah", flag: "usa", msg: "Walking around Huinnyeoul Culture Village.", loc: "Yeongdo", time: "1 hr ago", img: "./images/main/user1.png" },
                    { name: "Minji", flag: "kor", msg: "Enjoying the sea breeze at Taejongdae.", loc: "Taejongdae", time: "1 hr 20 mins ago", img: "./images/main/user2.png" }
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

        // 5. Mate Stories Logic (English Data)
        const storiesData = [
            {
                img: "./images/main/mate_stories_photo1.png", name: "Sarah",
                tags: ["#WithMate", "#BusanLife", "#GamcheonCultureVillage", "#Travelgram", "#KoreaTravel"],
                review: "Walking through Gamcheon Culture Village with a local mate made the steep hills feel like nothing!"
            },
            {
                img: "./images/main/mate_stories_photo2.png", name: "James",
                tags: ["#FirstBusanTrip", "#Gwangalli", "#Gwangandaegyo", "#NightView", "#BusanTravel"],
                review: "Seeing the Gwangandaegyo Bridge at night for the first time was breathtaking. I want to come back soon."
            },
            {
                img: "./images/main/mate_stories_photo3.png", name: "Minji",
                tags: ["#LocalTips", "#DwaejiGukbap", "#SeomyeonFood", "#BusanFoodie", "#LocalEats"],
                review: "I tasted the best Dwaeji Gukbap in a local food alley recommended by my mate!"
            },
            {
                img: "./images/main/mate_stories_photo4.png", name: "Alex",
                tags: ["#HiddenGems", "#YeongdoCafe", "#HuinnyeoulCultureVillage", "#OceanView", "#QuietTravel"],
                review: "Exploring hidden, quiet ocean-view cafes in Yeongdo was the highlight of this trip."
            },
            {
                img: "./images/main/mate_stories_photo5.png", name: "Chen",
                tags: ["#FoodTour", "#StreetFood", "#BIFFSquare", "#SsiatHotteok", "#Nampodong", "#BusanFood"],
                review: "BIFF Square street food is a must! The Ssiat Hotteok is the best I've ever had!"
            },
            {
                img: "./images/main/mate_stories_photo6.png", name: "Elena",
                tags: ["#NightView", "#MarineCableCar", "#SongdoBeach", "#CityLights", "#RomanticBusan"],
                review: "The city lights seen from the Songdo Marine Cable Car at night were so romantic."
            },
            {
                img: "./images/main/mate_stories_photo7.png", name: "Yuki",
                tags: ["#SlowTravel", "#Haeundae", "#NightWalk", "#Busking", "#HealingTime"],
                review: "Just sitting on Haeundae Beach listening to busking was completely healing."
            },
            {
                img: "./images/main/mate_stories_photo8.png", name: "Daniel",
                tags: ["#UnexpectedMoments", "#JagalchiMarket", "#FishMarket", "#LocalVibe", "#SeafoodParty"],
                review: "I stumbled upon a small festival at Jagalchi Market. A place full of life and energy!"
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