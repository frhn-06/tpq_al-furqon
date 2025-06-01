// icon
feather.replace();

// aos
AOS.init();

// header
const headerFixActive = (header) => {
    const headerFix = header.offsetTop;

    const judul = document.querySelector('.judul-al-furqon');
    const burger = document.querySelector('.burger');
    const navItem = document.querySelector('.nav').querySelectorAll('a');

    if(window.pageYOffset > headerFix) {
        header.classList.add('header-fix');
        judul.classList.add('judul-fix');
        burger.classList.add('burger-turun');
        navItem.forEach(nav => {
            nav.classList.add('nav-turun'); 
        });
        document.body.classList.add('x-hidden');
    } else {
        header.classList.remove('header-fix');
        judul.classList.remove('judul-fix');
        burger.classList.remove('burger-turun');
        navItem.forEach(nav => {
            nav.classList.remove('nav-turun'); 
        });
    }
}

const bukaNav = (burger) => {
    const span = burger.querySelectorAll('span');
    span[0].classList.add('span-1-active');
    span[1].classList.add('span-2-active');
    span[2].classList.add('span-3-active');
}

const navMuncul = () => {
    const nav = document.querySelector('.nav');
    nav.classList.add('nav-muncul');
}

const tutupNav = (nav) => {
    nav.classList.remove('nav-muncul');
    nav.classList.add('nav-tutup');
    setTimeout(() => {
        nav.classList.remove('nav-tutup');
    }, 1000)
}

const resetBurger = (burger) => {
    const span = burger.querySelectorAll('span');
    span[0].classList.remove('span-1-active');
    span[1].classList.remove('span-2-active');
    span[2].classList.remove('span-3-active');
}

const tutupNavbar = (e) => {
    const nav = document.querySelector('.nav');
    if(burger.contains(e.target) || nav.contains(e.target)) {
        false;
    } else {
        if(nav.classList.contains('nav-muncul')) {
            tutupNav(nav);
            resetBurger(burger);
        }
    }
}

const bukaVisiMisi = (misi) => {
    misi.classList.add('visi-misi-buka');
}

const tutupVisiMisi = (misi) => {
    misi.classList.add('visi-misi-tutup');
}

const aturvisiMisi = () => {
    const visiMisi = document.querySelector('.visi-misi');
    if(visiMisi.classList.contains('visi-misi-buka')) {
        visiMisi.classList.remove('visi-misi-buka');
        tutupVisiMisi(visiMisi);
        setTimeout(() => {
            visiMisi.classList.remove('visi-misi-tutup');
        }, 1000)
    } else {
        bukaVisiMisi(visiMisi);
    }
}

// about
const burgerTentangActive = (burger) => {
    const span = burger.querySelectorAll('span');
    span[0].classList.toggle('span-1-active');
    span[1].classList.toggle('span-2-active');
    span[2].classList.toggle('span-3-active');
}

const bukaNavAbout = (burger) => {
    const span = burger.querySelectorAll('span');
    const navAbout = document.querySelector('.nav-about');
    if(span[0].classList.contains('span-1-active')) {
        navAbout.classList.add('nav-about-muncul');
    } else {
        navAbout.classList.remove('nav-about-muncul');
        navAbout.classList.add('nav-about-tutup');
        setTimeout(() => {
            navAbout.classList.remove('nav-about-tutup');
        }, 1000)
    }
}

// galeri validasi
const getAlumnus = async (file) => {
    return fetch('./data/' + file)
            .then(hasil => {
                if(hasil.status !== 200) {
                    throw new Error('tidak ada foto alumnus');
                }
                const data = hasil.json();
                return data;
            })
            .then(hasil => {
                return hasil;
            });
}

const isiGaleri = (e) => {
    return `
            <div 
            data-aos="zoom-in-up"
            data-aos-duration="1500">
                <div class="galeri-item w-full mb-4 md:w-100 md:mx-2 lg:w-90 lg:mx-4 lg:mb-8 relative group shadow-2xl shadow-white/10  overflow-hidden transition-all duration-500 hover:shadow-none hover:scale-95 hover:translate-y-2">
                    <img src="./img/galeri/${e.src}" alt="${e.nama}" class="w-full">
                    <div class="operplay-foto absolute top-0 left-0 right-0 bottom-0 bg-white/30 scale-y-0 origin-top group-hover:scale-y-100 transition-all duration-300 ease-in-out">
                  
                    </div>
                    <div class="judul-foto absolute top-0 right-0 left-0 bottom-0 flex justify-center items-center translate-y-full group-hover:translate-y-0 transition-all duration-300 ease-in-out delay-100">
                        <h4 class="font-light text-3xl text-black" style="font-family: Berkshire Swash, serif;">
                            AL FURQON
                        </h4>
                    </div>
                </div>
            </div>
                `;
}

const galeriBaru = async () => {
    const dataJson = await getAlumnus('alumnus.json');
    let isi = ''
    
    dataJson.forEach(e => {
        isi += isiGaleri(e);
    });

    const wadahGaleri = document.querySelector('.wadah-galeri');
    wadahGaleri.innerHTML = isi;

    let activeItem = null;
    const galeriItem = document.querySelectorAll('.galeri-item');
    galeriItem.forEach((item) => {
        item.addEventListener('touchstart', () => {
            buangEfek();
            tambahEfek(item);
            activeItem = item
        });
    });
    
    document.body.addEventListener('touchstart', (e) => {
        if(activeItem && !activeItem.contains(e.target)) {
            buangEfek();
            activeItem = null;
        }
    });
    
    galeriItem.forEach(item => {
        item.addEventListener('click', () => {
            const fototuju = item.querySelector('img').getAttribute('src'); 
    
            bukaFotoBesar(fototuju);
            layarAnteng();
        });
    });
    
    
    const tutup = document.querySelector('.tombol-close');
    tutup.addEventListener('click', () => {
        tutupFotoBesar(tutup);
        layarOraAnteng();
    });
}

// galeri eksekusi
const dapatkanArrayGaleri = () => {
    return Array.from(document.querySelectorAll('.galeri-item'));
}

const buangEfekOperplay = () => {
    const galeriItem = dapatkanArrayGaleri();

    const itemada = galeriItem.find(leri =>{
        return leri.querySelector('.operplay-foto-tempel')?.classList.remove('operplay-foto-tempel');
    });
    return itemada;
}

const buangjudul = () => {
    const galeriItem = dapatkanArrayGaleri();

    const itemada = galeriItem.find(leri =>{
        return leri.querySelector('.judul-foto-tempel')?.classList.remove('judul-foto-tempel');
    });
    return itemada
}

const buangTransisi = () => {
    const galeriItem = dapatkanArrayGaleri();
    
    const itemada = galeriItem.find(leri =>{
        return leri.classList.remove('transisi');
    });
    return itemada;
}

const buangEfek = () => {
    buangEfekOperplay()
    buangjudul();
    buangTransisi();
}

const tambahEfek = (item) => {
    const operplay = item.querySelector('.operplay-foto');
    const judul = item.querySelector('.judul-foto');

    item.classList.add('transisi');
    operplay.classList.add('operplay-foto-tempel');
    judul.classList.add('judul-foto-tempel');
} 


const bukaFotoBesar = (src) => {
    const operplay = document.querySelector('.overplay-foto-besar')
    const foto = document.querySelector('.foto-besar');
    const close = document.querySelector('.tombol-close');

    const img = foto.querySelector('img');

    img.setAttribute('src', src);
    operplay.classList.add('overplay-foto-besar-active');
    foto.classList.add('active');
    close.classList.add('active');
}

const tutupFotoBesar = (x) => {
    const operplay = document.querySelector('.overplay-foto-besar')
    const foto = document.querySelector('.foto-besar');
    const img = foto.querySelector('img');

    img.removeAttribute('src');
    operplay.classList.remove('overplay-foto-besar-active');
    foto.classList.remove('active');
    x.classList.remove('active');
} 


const layarAnteng = () => {
    document.body.classList.add('y-hidden');
}

const layarOraAnteng = () => {
    document.body.classList.remove('y-hidden');
}


// ------------------------------------ //

// icon
const iconWa = document.querySelector('.a-wa');
iconWa.addEventListener('touchstart', () => {
    iconWa.classList.add('a-wa-hover');
});
iconWa.addEventListener('touchend', () => {
    iconWa.classList.remove('a-wa-hover');
});

// header
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    headerFixActive(header);
});

const burger = document.querySelector('.burger');
burger.addEventListener('click', () => {
    bukaNav(burger);
    navMuncul();
});

document.body.addEventListener('click', (e) => {
    tutupNavbar(e);
});



// hero
const slogan = document.querySelector('.slogan');
slogan.addEventListener('touchstart', () => {
    slogan.classList.add('slogan-tempel'); 
});
slogan.addEventListener('touchend', () => {
    slogan.classList.remove('slogan-tempel'); 
});




// tentang
const btnVisiMisi = document.querySelector('.btn-visi-misi');
btnVisiMisi.addEventListener('click', (e) => {
    e.preventDefault();
    aturvisiMisi();
});

btnVisiMisi.addEventListener('touchstart', () => {
    btnVisiMisi.classList.add('slogan-tempel'); 
});
btnVisiMisi.addEventListener('touchend', () => {
    btnVisiMisi.classList.remove('slogan-tempel'); 
});


// galeri
galeriBaru();



// kontak
const kirim = document.querySelector('.kirim');
kirim.addEventListener('touchstart', () => {
    kirim.classList.add('slogan-tempel'); 
});
kirim.addEventListener('touchend', () => {
    kirim.classList.remove('slogan-tempel'); 
});

kirim.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Server sedang bermasalah !')
});

// footer
const navFoot = document.querySelector('.nav-foot');
navFoot.addEventListener('touchstart', () => {
    navFoot.classList.add('tempel') 
});
navFoot.addEventListener('touchend', () => {
    navFoot.classList.remove('tempel') 
});

const logfoot = document.querySelector('.logo-foot');
logfoot.addEventListener('touchstart', () => {
    logfoot.classList.add('logo-tempel');
});
logfoot.addEventListener('touchend', () => {
    logfoot.classList.remove('logo-tempel');
});




