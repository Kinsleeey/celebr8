// CURSOR
    const dot=document.querySelector('.cursor-dot'),ring=document.querySelector('.cursor-ring');
    let mx=0,my=0,rx=0,ry=0;
    document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px';});
    (function anim(){rx+=(mx-rx)*0.1;ry+=(my-ry)*0.1;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(anim);})();
    document.querySelectorAll('a,button').forEach(el=>{
        el.addEventListener('mouseenter',()=>ring.classList.add('hover'));
        el.addEventListener('mouseleave',()=>ring.classList.remove('hover'));
    });

    // NAV SCROLL
    const mainNav=document.getElementById('main-nav');
    window.addEventListener('scroll',()=>mainNav.classList.toggle('scrolled',scrollY>80));

    // MOBILE MENU
    const tog=document.getElementById('mobile-toggle'),nl=document.querySelector('.nav-links');
    tog.addEventListener('click',()=>{
        const o=nl.classList.toggle('open'),s=tog.querySelectorAll('span');
        s[0].style.transform=o?'rotate(45deg) translate(5px,5px)':'';
        s[1].style.opacity=o?'0':'1';
        s[2].style.transform=o?'rotate(-45deg) translate(5px,-5px)':'';
        document.body.style.overflow=o?'hidden':'';
    });
    nl.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
        nl.classList.remove('open');
        tog.querySelectorAll('span').forEach(s=>{s.style.transform='';s.style.opacity='';});
        document.body.style.overflow='';
    }));

    // TABS
    const rowObs=new IntersectionObserver(entries=>{
        entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');rowObs.unobserve(e.target);}});
    },{ threshold: 0.1, rootMargin: '0px 0px 0px 0px' });

    document.querySelectorAll('.tab-btn').forEach(btn=>{
        btn.addEventListener('click',()=>{
            document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
            document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
            btn.classList.add('active');
            const panel=document.getElementById('tab-'+btn.dataset.tab);
            panel.classList.add('active');
            panel.querySelectorAll('.cocktail-card').forEach(row=>{
                row.classList.remove('visible');
                setTimeout(()=>rowObs.observe(row),20);
            });
        });
    });

    // SCROLL REVEAL
    document.querySelectorAll('.cocktail-card,.reveal').forEach(el=>rowObs.observe(el));

    // HERO PARALLAX
    const heroBg=document.querySelector('.hero-right img');
    window.addEventListener('scroll',()=>{
        if(scrollY<innerHeight)heroBg.style.transform=`scale(1.05) translateY(${scrollY*0.14}px)`;
    });

    const recipes = {
            "Gin & Tonic": ["Tanqueray gin","Splash of tonic water","Garnished with lemon, blueberries and rosemary"],
            "Aged old Fashion": ["Scotch whiskey","Aromatic bitters","Almond nut infused honey","Aged in a mini barrel for 3 months"],
            "Martini": ["Tanqueray","Vermouth","Lemon cordial","Garnished with lemon zest"],
            "Whisky Sour": ["Scotch whisky","Freshly squeezed lemon juice","Orange and apricot infused simple syrup","Aromatic bitters"],
            "Mint Lemonade": ["Freshly squeezed lemon juice","Lemon infused simple syrup","Muddled mint leaves","Splash of soda water"],
            "Orange & Peach Ice Tea": ["Freshly squeezed orange juice","Peach puree","Lemon juice","Black tea"],
            "Fresh Watermelon Juice": ["Freshly squeezed watermelon juice"],
            "Fresh Pineapple Juice": ["Freshly squeezed pineapple juice"],
            "Smoky Sunset": ["Dehydrated pineapple infused Scotch","Passion fruit solution","Lemon juice","Splash of pineapple juice","Egg white (optional)"],
            "Green Confetti": ["Tanqueray","Muddled green apples","Lemon juice","Apple solution","Pinch of cinnamon"],
            "Mango Margarita": ["Tequila","Green jalapeño","Mango puree","Lemon juice"],
            "Lagos Waters": ["Tanqueray","Soursop puree","Lemongrass liqueur","Lemon juice","Splash of lemon soda"]
        };

        const popup    = document.getElementById('recipe-popup');
        const backdrop = document.getElementById('recipe-backdrop');
        const closeBtn = document.getElementById('recipe-close');
        const titleEl  = document.getElementById('recipe-title');
        const listEl   = document.getElementById('recipe-list');

        function openPopup(drinkName) {
            const key = Object.keys(recipes).find(k =>
                drinkName.toLowerCase().includes(k.toLowerCase()) ||
                k.toLowerCase().includes(drinkName.toLowerCase().trim())
            ) || drinkName;
            const ingredients = recipes[key] || ["Recipe coming soon."];
            titleEl.textContent = key;
            listEl.innerHTML = ingredients.map(i => `<li>${i}</li>`).join('');
            popup.classList.add('open');
            backdrop.classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        function closePopup() {
            popup.classList.remove('open');
            backdrop.classList.remove('open');
            document.body.style.overflow = '';
        }

        closeBtn.addEventListener('click', closePopup);
        backdrop.addEventListener('click', closePopup);
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closePopup(); });

        document.querySelectorAll('.btn-line').forEach(btn => {
            btn.addEventListener('click', e => {
                e.preventDefault();
                const card = btn.closest('.cocktail-card');
                const name = card.querySelector('h3').innerText.replace(/\n/g,' ').trim();
                openPopup(name);
            });
        });
    






