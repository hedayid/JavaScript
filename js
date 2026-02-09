//<![CDATA[
        
        // --- PRELOADER SCRIPT ---
        window.addEventListener('load', function() {
            var preloader = document.getElementById('site-preloader');
            if(preloader) {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                setTimeout(function() {
                    preloader.style.display = 'none';
                }, 500); // Wait for transition to finish
            }
        });

        // --- USER CONFIGURATION (CHANGE TAB NAMES HERE) ---
        const tabConfig = {
            quota:   { title: "QUOTA",   label: "Quota" },   // Change Name (title) and Label here
            bester:  { title: "BESTER",  label: "Bester" },  // Change Name (title) and Label here
            prestig: { title: "PRESTIG", label: "Prestig" }  // Change Name (title) and Label here
        };
        // --------------------------------------------------

        // --- CONTACT FORM HANDLER (AJAX) ---
        var form = document.getElementById("ajax-contact-form");
        if(form) {
            form.addEventListener("submit", function(ev) {
                ev.preventDefault();
                var data = new FormData(form);
                var btn = form.querySelector('button');
                var originalText = btn.innerText;
                btn.innerText = "Sending...";
                btn.disabled = true;

                fetch(form.action, {
                    method: form.method,
                    body: data,
                    headers: { 'Accept': 'application/json' }
                }).then(response => {
                    if (response.ok) {
                        alert("Success! Your message has been sent.");
                        form.reset();
                        document.getElementById('newContactModal').classList.remove('open');
                    } else {
                        response.json().then(data => {
                            if (Object.hasOwn(data, 'errors')) {
                                alert(data["errors"].map(error => error["message"]).join(", "));
                            } else {
                                alert("Oops! There was a problem submitting your form");
                            }
                        })
                    }
                    btn.innerText = originalText;
                    btn.disabled = false;
                }).catch(error => {
                    alert("Oops! There was a problem submitting your form");
                    btn.innerText = originalText;
                    btn.disabled = false;
                });
            });
        }

        function toggleTheme() {
            var body = document.body;
            var icon = document.getElementById('themeIcon');
            body.classList.toggle('dark-mode');
            if(body.classList.contains('dark-mode')) {
                icon.className = 'fa fa-sun-o';
                localStorage.setItem('theme', 'dark');
            } else {
                icon.className = 'fa fa-moon-o';
                localStorage.setItem('theme', 'light');
            }
        }
        (function() {
            var savedTheme = localStorage.getItem('theme');
            if(savedTheme === 'dark') {
                document.body.classList.add('dark-mode');
                window.addEventListener('DOMContentLoaded', function() {
                    var icon = document.getElementById('themeIcon');
                    if(icon) icon.className = 'fa fa-sun-o';
                });
            }
        })();

        window.onscroll = function() {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                document.getElementById("backToTop").style.display = "flex";
            } else {
                document.getElementById("backToTop").style.display = "none";
            }
        };
        function scrollToTop() { window.scrollTo({top: 0, behavior: 'smooth'}); }

        let slideIndex = 1; showSlides(slideIndex);
        function plusSlides(n) { showSlides(slideIndex += n); }
        function currentSlide(n) { showSlides(slideIndex = n); }
        function showSlides(n) {
            let i; let slides = document.getElementsByClassName("mySlides"); let dots = document.getElementsByClassName("dot");
            if (slides.length > 0) {
                if (n > slides.length) {slideIndex = 1} if (n < 1) {slideIndex = slides.length}
                for (i = 0; i < slides.length; i++) { slides[i].style.display = "none"; }
                for (i = 0; i < dots.length; i++) { dots[i].className = dots[i].className.replace(" active-dot", ""); }
                slides[slideIndex-1].style.display = "block"; dots[slideIndex-1].className += " active-dot";
            }
        }
        setInterval(function(){ plusSlides(1); }, 5000); 

        function toggleMegaMenu() { document.getElementById('megaMenu').classList.toggle('active'); document.getElementById('menuIcon').classList.toggle('active'); }
        function toggleSearch() { var sb = document.getElementById('searchBar'); var inp = sb.querySelector('input'); if(sb.classList.contains('active')){ sb.classList.remove('active'); } else { sb.classList.add('active'); setTimeout(function(){ inp.focus(); }, 300); } }
        document.addEventListener('click', function(e) { var sb = document.getElementById('searchBar'); var st = document.getElementById('searchTrigger'); if(sb && sb.classList.contains('active') && !sb.contains(e.target) && e.target !== st) { sb.classList.remove('active'); } });

        const texts = ["Welcome to Khokon School Official Website...", "Notice: All Class exam routine starts 30 August, 2026...", "Admission Open for Session 2026! Apply Now..."];
        let count = 0; let index = 0; let currentText = ""; let letter = "";
        (function type() { if (count === texts.length) { count = 0; } currentText = texts[count]; letter = currentText.slice(0, ++index); if(document.querySelector(".typing-text")) document.querySelector(".typing-text").textContent = letter; if (letter.length === currentText.length) { count++; index = 0; setTimeout(type, 2000); } else { setTimeout(type, 80); } }());

        var tabNames = ['tab-update', 'tab-quota', 'tab-bester', 'tab-prestig', 'tab-service'];
        var currentTabIndex = 0;
        var activeTabId = 'tab-update';
        var postCounts = { 'tab-update': 7, 'tab-quota': 1, 'tab-bester': 1, 'tab-prestig': 1, 'tab-service': 0 };

        function openTab(evt, tabId) {
            var tabcontent = document.getElementsByClassName("tab-pane");
            for (var i = 0; i < tabcontent.length; i++) { tabcontent[i].style.display = "none"; tabcontent[i].classList.remove("active"); }
            var tablinks = document.getElementsByClassName("tab-item");
            for (var i = 0; i < tablinks.length; i++) { tablinks[i].classList.remove("active"); }
            if(document.getElementById(tabId)) {
                document.getElementById(tabId).style.display = "block";
                setTimeout(function(){ document.getElementById(tabId).classList.add("active"); }, 10);
                activeTabId = tabId; 
            }
            if(evt) evt.currentTarget.classList.add("active");
            else { 
                currentTabIndex = tabNames.indexOf(tabId); 
                if(tablinks[currentTabIndex]) tablinks[currentTabIndex].classList.add("active"); 
            }
            var loadMoreBtn = document.getElementById('mainLoadMore');
            if(loadMoreBtn) loadMoreBtn.style.display = 'block';
        }
        function nextTab() { currentTabIndex++; if (currentTabIndex >= tabNames.length) currentTabIndex = 0; openTab(null, tabNames[currentTabIndex]); }
        function prevTab() { currentTabIndex--; if (currentTabIndex < 0) currentTabIndex = tabNames.length - 1; openTab(null, tabNames[currentTabIndex]); }

        function openSidebarTab(evt, tabId) {
            var sidecontent = document.getElementsByClassName("side-tab-content");
            for (var i = 0; i < sidecontent.length; i++) { sidecontent[i].classList.remove("active"); }
            var sidelinks = document.getElementsByClassName("pop-tab");
            for (var i = 0; i < sidelinks.length; i++) { sidelinks[i].classList.remove("active"); }
            document.getElementById(tabId).classList.add("active");
            evt.currentTarget.classList.add("active");
        }

        function loadMorePosts() {
            var loader = document.getElementById('loader');
            var btnText = document.getElementById('loadMoreText');
            loader.style.display = 'inline-block';
            btnText.style.opacity = '0.5';
            var label = '';
            var isLabelPage = window.location.href.indexOf('/search/label/') > -1;
            
            if (isLabelPage) {
                var parts = window.location.href.split('/search/label/');
                label = parts[1].split('?')[0]; 
                label = '-/' + decodeURIComponent(label);
            } else {
                if(activeTabId === 'tab-update') label = ''; 
                else if(activeTabId === 'tab-quota') label = '-/' + tabConfig.quota.label;
                else if(activeTabId === 'tab-bester') label = '-/' + tabConfig.bester.label;
                else if(activeTabId === 'tab-prestig') label = '-/' + tabConfig.prestig.label;
                else if(activeTabId === 'tab-service') label = '-/Service';
            }
            
            var startIndex = postCounts[activeTabId];
            var script = document.createElement('script');
            script.src = '/feeds/posts/default/' + label + '?alt=json&callback=appendPosts&start-index=' + startIndex + '&max-results=5';
            document.body.appendChild(script);
        }

        function appendPosts(json) {
            var html = '';
            var targetListId = 'list-' + activeTabId;
            if(activeTabId === 'tab-update') {
                var existingList = document.querySelector('#tab-update .notice-list');
                if(existingList) targetListId = null;
            }
            if (json.feed.entry) {
                var startIndex = postCounts[activeTabId];
                for (var i = 0; i < json.feed.entry.length; i++) {
                    var entry = json.feed.entry[i];
                    var title = entry.title.$t;
                    var link = "";
                    for (var k = 0; k < entry.link.length; k++) { if (entry.link[k].rel == 'alternate') { link = entry.link[k].href; break; } }
                    var raw = entry.published.$t; var y = raw.substring(0, 4); var m = raw.substring(5, 7); var d = raw.substring(8, 10); var formattedDate = " - " + d + "/" + m + "/" + y;
                    var img = "";
                    if (entry.media$thumbnail) { img = '<img class="n-thumb" src="' + entry.media$thumbnail.url + '"/>'; } 
                    else { img = '<div class="n-thumb-placeholder"><i class="fa fa-image"></i></div>'; }
                    var count = startIndex + i;
                    
                    if(activeTabId === 'tab-service') {
                        var iconColor = (i % 2 === 0) ? 'icon-green' : 'icon-purple';
                        html += '<a href="' + link + '" class="service-item"><i class="fa fa-check-circle service-icon ' + iconColor + '"></i><span class="service-title">' + title + '</span></a>';
                    } else {
                        html += '<div class="notice-item animation-fade"><div class="n-count">' + count + '</div>' + img + '<div class="n-title"><a href="' + link + '">' + title + '<span class="date-inline">' + formattedDate + '</span></a></div></div>';
                    }
                }
                if(activeTabId === 'tab-service') {
                     document.querySelector('#tab-service .service-grid').insertAdjacentHTML('beforeend', html);
                } else if(activeTabId === 'tab-update' && targetListId === null) {
                     document.querySelector('#tab-update .notice-list').insertAdjacentHTML('beforeend', html);
                } else {
                     document.getElementById(targetListId).insertAdjacentHTML('beforeend', html);
                }
                postCounts[activeTabId] += 5;
            } else { alert("No more posts to load!"); }
            document.getElementById('loader').style.display = 'none';
            document.getElementById('loadMoreText').style.opacity = '1';
        }

        function fetchAndFill(label, containerId) {
             var script = document.createElement('script');
             var callbackName = 'cb_' + containerId.replace(/-/g, '_');
             window[callbackName] = function(json) {
                 var html = '';
                 if (json.feed.entry) {
                    for (var i = 0; i < json.feed.entry.length; i++) {
                        var entry = json.feed.entry[i];
                        var title = entry.title.$t;
                        var link = "";
                        for (var k = 0; k < entry.link.length; k++) { if (entry.link[k].rel == 'alternate') { link = entry.link[k].href; break; } }
                        var raw = entry.published.$t; var y = raw.substring(0, 4); var m = raw.substring(5, 7); var d = raw.substring(8, 10); var formattedDate = " - " + d + "/" + m + "/" + y;
                        var img = "";
                        if (entry.media$thumbnail) { img = '<img class="n-thumb" src="' + entry.media$thumbnail.url + '"/>'; } 
                        else { img = '<div class="n-thumb-placeholder"><i class="fa fa-image"></i></div>'; }
                        html += '<div class="notice-item"><div class="n-count">' + (i + 1) + '</div>' + img + '<div class="n-title"><a href="' + link + '">' + title + '<span class="date-inline">' + formattedDate + '</span></a></div></div>';
                    }
                    document.getElementById(containerId).innerHTML = html;
                    postCounts[containerId.replace('list-', '')] = 6; 
                 }
             };
             script.src = '/feeds/posts/default/-/' + label + '?alt=json&callback=' + callbackName + '&max-results=5';
             document.body.appendChild(script);
        }

        // --- NEW FUNCTION: Toggle Sidebar Expand/Collapse ---
        function toggleSidebarItems(containerId, btn) {
            var container = document.getElementById(containerId);
            if(!container) return;
            var items = container.querySelectorAll('.toggle-item');
            var isExpanded = btn.getAttribute('data-expanded') === 'true';

            if (!isExpanded) {
                // EXPAND action
                items.forEach(function(item) {
                    item.style.setProperty('display', 'flex', 'important');
                });
                btn.innerHTML = '<i class="fa fa-chevron-up"></i> COLLAPSE';
                btn.setAttribute('data-expanded', 'true');
            } else {
                // COLLAPSE action
                items.forEach(function(item) {
                    item.style.setProperty('display', 'none', 'important');
                });
                btn.innerHTML = '<i class="fa fa-chevron-down"></i> EXPAND';
                btn.setAttribute('data-expanded', 'false');
            }
        }

        window.onload = function() {
            // Apply User Config to Tab Titles
            if(document.getElementById('name-tab-quota')) {
                document.getElementById('name-tab-quota').innerText = tabConfig.quota.title;
                document.getElementById('name-tab-bester').innerText = tabConfig.bester.title;
                document.getElementById('name-tab-prestig').innerText = tabConfig.prestig.title;
            }

            // Fetch Posts
            if(document.getElementById('list-tab-quota')) {
                fetchAndFill(tabConfig.quota.label, 'list-tab-quota');
                fetchAndFill(tabConfig.bester.label, 'list-tab-bester');
                fetchAndFill(tabConfig.prestig.label, 'list-tab-prestig');
            }
        };
        //]]>
