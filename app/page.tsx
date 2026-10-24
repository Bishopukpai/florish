'use client';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Expose functions globally for dynamic inline HTML click handlers
    (window as any).approveDonation = approveDonation;
    (window as any).closeAdminTracker = closeAdminTracker;
    (window as any).openAdminTracker = openAdminTracker;
    (window as any).openDonateModal = openDonateModal;
    (window as any).closeDonateModal = closeDonateModal;
    (window as any).goToBankDetails = goToBankDetails;
    (window as any).backToStep1 = backToStep1;
    (window as any).confirmTransfer = confirmTransfer;
    (window as any).copyAccNumber = copyAccNumber;
    (window as any).setAmount = setAmount;
    (window as any).openAdminLoginModal = openAdminLoginModal;
    (window as any).closeAdminLoginModal = closeAdminLoginModal;
    (window as any).openAdminSignupModal = openAdminSignupModal;
    (window as any).closeAdminSignupModal = closeAdminSignupModal;
    (window as any).openVolunteerModal = openVolunteerModal;
    (window as any).openPartnerModal = openPartnerModal;

    // Scroll Animation Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active');
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.scroll-animate, .scroll-left, .scroll-right').forEach((el) => {
      observer.observe(el);
    });

    // Review Carousel Slider Ticker
    let currentSlide = 0;
    const track = document.getElementById('review-track');
    const reviewInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % 2;
      if (track && track.children.length > 0) {
        const firstChild = track.children[0] as HTMLElement;
        const cardWidth = firstChild.offsetWidth + 32;
        track.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
      }
    }, 4000);

    // Smooth Counter Animation with Prefix & Suffix Support
    const counters = document.querySelectorAll('.counter');
    const speed = 50;

    counters.forEach(counterEl => {
      const counter = counterEl as HTMLElement;
      const updateCount = () => {
        const target = +counter.getAttribute('data-target')!;
        const prefix = counter.getAttribute('data-prefix') || '';
        const suffix = counter.getAttribute('data-suffix') || '+';
        const current = +counter.innerText.replace(/[^0-9]/g, '') || 0;
        
        const increment = target / speed;

        if (current < target) {
          const nextVal = Math.ceil(current + increment);
          counter.innerText = prefix + (nextVal > target ? target : nextVal).toLocaleString() + suffix;
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = prefix + target.toLocaleString() + suffix;
        }
      };

      updateCount();
    });

    // Hero Image Carousel Slider Ticker
    let currentHeroSlide = 0;
    const heroTrack = document.getElementById('hero-slider');
    const heroInterval = setInterval(() => {
      if (heroTrack && heroTrack.children.length > 0 && heroTrack.parentElement) {
        currentHeroSlide = (currentHeroSlide + 1) % heroTrack.children.length;
        const slideWidth = heroTrack.parentElement.clientWidth;
        heroTrack.style.transform = `translateX(-${currentHeroSlide * slideWidth}px)`;
      }
    }, 4000);

    // Mission Section Image Slider Ticker
    let currentMissionSlide = 0;
    const missionTrack = document.getElementById('mission-slider');
    const missionInterval = setInterval(() => {
      if (missionTrack && missionTrack.children.length > 0 && missionTrack.parentElement) {
        currentMissionSlide = (currentMissionSlide + 1) % missionTrack.children.length;
        const slideWidth = missionTrack.parentElement.clientWidth;
        missionTrack.style.transform = `translateX(-${currentMissionSlide * slideWidth}px)`;
      }
    }, 4000);

    return () => {
      clearInterval(reviewInterval);
      clearInterval(heroInterval);
      clearInterval(missionInterval);
    };
  }, []);

  return (
    <div className="bg-[#fcfdfd] text-gray-800 font-sans antialiased overflow-x-hidden">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                <div className="w-10 h-10 rounded-full overflow-hidden bg-teal-600 flex items-center justify-center text-white font-bold shadow-md group-hover:scale-110 transition duration-300">
                    <img src="/images/IMG-20261020-WA0123.jpg" alt="Flourish Foundation Logo" className="w-10 h-10 object-cover rounded-full" />
                </div>
                <span className="text-xl font-black text-gray-900 tracking-tight">Florish<span className="text-teal-600">.</span></span>
            </div>

            <nav className="hidden lg:flex items-center space-x-8 text-sm font-semibold text-gray-600">
                <a href="#about" className="hover:text-teal-600 transition">About</a>
                <a href="#mission" className="hover:text-teal-600 transition">Mission</a>
                <a href="#programs" className="hover:text-teal-600 transition">Programs</a>
                <a href="#impact" className="hover:text-teal-600 transition">Impact</a>
                <a href="#stories" className="hover:text-teal-600 transition">Stories</a>
                <a href="#get-involved" className="hover:text-teal-600 transition">Get Involved</a>
                <a href="#faq" className="hover:text-teal-600 transition">FAQ</a>
            </nav>

            <div className="flex items-center space-x-4">
                <button onClick={openDonateModal} className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-teal-600/30 hover:scale-105 transition duration-300">
                    Donate Now
                </button>
            </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center relative">
        <div className="inline-flex items-center space-x-2 bg-teal-50 text-teal-700 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 border border-teal-100 scroll-animate">
            <i className="fa-regular fa-heart text-teal-600 animate-pulse"></i>
            <span>Empowering African Women & Youths</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight max-w-4xl mx-auto leading-none mb-6 scroll-animate">
            Empowering Women, <br/><span className="text-teal-600">Inspiring Youths</span> <span className="text-amber-600">Across Africa</span>
        </h1>

        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-8 font-normal leading-relaxed scroll-animate">
            Tackling critical challenges such as gender inequality, limited education, and healthcare barriers. We provide African women and youths with the tools, skills, and opportunities to build sustainable futures.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 scroll-animate">
            <button onClick={openDonateModal} className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white px-8 py-3.5 rounded-full font-bold shadow-xl shadow-teal-600/20 hover:scale-105 transition duration-300 flex items-center justify-center space-x-2">
                <span>Donate Now</span>
                <i className="fa-regular fa-heart text-xs"></i>
            </button>
            <a href="#impact" className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 px-8 py-3.5 rounded-full font-bold shadow-sm hover:border-teal-500 hover:scale-105 transition duration-300 flex items-center justify-center space-x-2">
                <span>See Our Impact</span>
                <i className="fa-solid fa-chevron-down text-xs animate-bounce"></i>
            </a>
        </div>

        {/* Impact Bar Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-t border-b border-gray-100 max-w-5xl mx-auto mb-16 scroll-animate">
            <div className="transform hover:scale-105 transition duration-300">
                <h3 className="text-3xl sm:text-4xl font-extrabold text-teal-600 counter" data-target="50000" data-suffix="+">0</h3>
                <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">Lives Changed</p>
            </div>
            <div className="transform hover:scale-105 transition duration-300">
                <h3 className="text-3xl sm:text-4xl font-extrabold text-teal-600 counter" data-target="120" data-suffix="+">0</h3>
                <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">Communities</p>
            </div>
            <div className="transform hover:scale-105 transition duration-300">
                <h3 className="text-3xl sm:text-4xl font-extrabold text-teal-600 counter" data-target="250" data-suffix="+">0</h3>
                <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">Volunteers</p>
            </div>
            <div className="transform hover:scale-105 transition duration-300">
                <h3 className="text-3xl sm:text-4xl font-extrabold text-teal-600 counter" data-target="85" data-suffix="+">0</h3>
                <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">Projects Funded</p>
            </div>
        </div>

        {/* Hero Image Carousel Slider Card */}
        <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white hover-lift scroll-animate relative">
            <div id="hero-slider" className="flex transition-transform duration-700 ease-in-out w-full">
                <div className="w-full flex-shrink-0">
                    <img src="/images/IMG-20261021-WA0054.jpg" alt="Flourish Foundation Community Outreach" className="w-full h-[400px] sm:h-[500px] object-cover" />
                </div>
                <div className="w-full flex-shrink-0">
                    <img src="/images/IMG-20261021-WA0054.jpg" alt="Flourish Foundation Speaker Event" className="w-full h-[400px] sm:h-[500px] object-cover" />
                </div>
                <div className="w-full flex-shrink-0">
                    <img src="/images/IMG-20261021-WA0123.jpg" alt="Flourish Foundation Students in Class" className="w-full h-[400px] sm:h-[500px] object-cover" />
                </div>
                <div className="w-full flex-shrink-0">
                    <img src="/images/IMG-20261021-WA0063.jpg" alt="Flourish Foundation Team Members" className="w-full h-[400px] sm:h-[500px] object-cover" />
                </div>
                <div className="w-full flex-shrink-0">
                    <img src="/images/IMG-20261021-WA0070.jpg" alt="Flourish Foundation International Women's Day" className="w-full h-[400px] sm:h-[500px] object-cover" />
                </div>
                <div className="w-full flex-shrink-0">
                    <img src="/images/IMG-20261021-WA0065.jpg" alt="Flourish Foundation Health Campaign" className="w-full h-[400px] sm:h-[500px] object-cover" />
                </div>
            </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-6 scroll-left">
                  <span className="bg-teal-50 text-teal-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-teal-100">Our Mission</span>
                  <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">Championing African Women & Youths</h2>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                      At Flourish Foundation, we recognize the systemic challenges—such as gender inequality, economic exclusion, and limited healthcare access—facing women and youths across Africa. We bridge these gaps by providing grassroots programs and targeted advocacy that uplift communities from within.
                  </p>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                      By combining strategic empowerment, skills training, and inclusive leadership initiatives, we ensure that women and youths are equipped to overcome barriers and become the architects of their own sustainable futures.
                  </p>
                  <div className="space-y-4 pt-2">
                      <div className="flex items-start space-x-4 p-3 rounded-xl hover:bg-teal-50/50 transition duration-300">
                          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0">
                              <i className="fa-solid fa-graduation-cap"></i>
                          </div>
                          <div>
                              <h4 className="font-bold text-gray-900 text-sm">Youth Skills & Education</h4>
                              <p className="text-xs text-gray-500 mt-0.5">Equipping African youths with vital education, leadership training, and vocational skills for a self-reliant tomorrow.</p>
                          </div>
                      </div>

                      <div className="flex items-start space-x-4 p-3 rounded-xl hover:bg-teal-50/50 transition duration-300">
                          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0">
                              <i className="fa-solid fa-heart-pulse"></i>
                          </div>
                          <div>
                              <h4 className="font-bold text-gray-900 text-sm">Women's Health & Advocacy</h4>
                              <p className="text-xs text-gray-500 mt-0.5">Tackling health barriers, promoting gender equality, and driving community-wide awareness campaigns for women.</p>
                          </div>
                      </div>

                      <div className="flex items-start space-x-4 p-3 rounded-xl hover:bg-teal-50/50 transition duration-300">
                          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0">
                              <i className="fa-solid fa-seedling"></i>
                          </div>
                          <div>
                              <h4 className="font-bold text-gray-900 text-sm">Sustainable Growth</h4>
                              <p className="text-xs text-gray-500 mt-0.5">Fostering long-term economic independence and social resilience across marginalized regions in Africa.</p>
                          </div>
                      </div>
                  </div>
                </div>

                <div className="scroll-right">
                    <div className="rounded-3xl overflow-hidden shadow-2xl bg-gray-100 p-2 border border-gray-100 hover-lift relative">
                        <div id="mission-slider" className="flex transition-transform duration-700 ease-in-out w-full">
                            <div className="w-full flex-shrink-0">
                                <img src="/images/IMG-20261021-WA0068.jpg" alt="Flourish Foundation SDG Graduation" className="w-full h-[480px] object-cover rounded-2xl" />
                            </div>
                            <div className="w-full flex-shrink-0">
                                <img src="/images/IMG-20261021-WA0057.jpg" alt="Flourish Foundation Gender Equality Presentation" className="w-full h-[480px] object-cover rounded-2xl" />
                            </div>
                            <div className="w-full flex-shrink-0">
                                <img src="/images/IMG-20261021-WA0093.jpg" alt="Flourish Foundation Podium Address" className="w-full h-[480px] object-cover rounded-2xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 scroll-animate">
                <span className="bg-teal-50 text-teal-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-teal-100">Programs</span>
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-3">How We Help</h2>
                <p className="text-gray-600 text-sm mt-2">Our four flagship programs address the critical challenges faced by women and youths across underserved African communities.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover-lift scroll-animate space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center text-xl">
                        <i className="fa-solid fa-graduation-cap"></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Youth Skills & Education</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Providing vocational training, digital skills, and educational support to equip African youths for self-reliance and modern career opportunities.</p>
                    <button onClick={openDonateModal} className="text-teal-600 font-bold text-sm inline-flex items-center space-x-1 hover:translate-x-2 transition duration-300">
                        <span>Support Program</span>
                        <i className="fa-solid fa-arrow-right text-xs"></i>
                    </button>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover-lift scroll-animate space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center text-xl">
                        <i className="fa-solid fa-heart-pulse"></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Women's Health & Advocacy</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Tackling healthcare barriers, promoting maternal and reproductive health awareness, and driving gender equality initiatives across local communities.</p>
                    <button onClick={openDonateModal} className="text-teal-600 font-bold text-sm inline-flex items-center space-x-1 hover:translate-x-2 transition duration-300">
                        <span>Support Program</span>
                        <i className="fa-solid fa-arrow-right text-xs"></i>
                    </button>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover-lift scroll-animate space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center text-xl">
                        <i className="fa-solid fa-chart-line"></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Economic Empowerment</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Offering financial literacy, micro-grants, and entrepreneurship cooperatives to help African women build independent livelihoods and break poverty cycles.</p>
                    <button onClick={openDonateModal} className="text-teal-600 font-bold text-sm inline-flex items-center space-x-1 hover:translate-x-2 transition duration-300">
                        <span>Support Program</span>
                        <i className="fa-solid fa-arrow-right text-xs"></i>
                    </button>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover-lift scroll-animate space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center text-xl">
                        <i className="fa-solid fa-seedling"></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Community Sustainability</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Partnering with grassroots leaders to implement sustainable farming, clean water access, and long-term community resilience projects.</p>
                    <button onClick={openDonateModal} className="text-teal-600 font-bold text-sm inline-flex items-center space-x-1 hover:translate-x-2 transition duration-300">
                        <span>Support Program</span>
                        <i className="fa-solid fa-arrow-right text-xs"></i>
                    </button>
                </div>
            </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 scroll-animate">
                <span className="bg-teal-50 text-teal-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-teal-100">Our Impact</span>
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-3">Numbers That Matter</h2>
                <p className="text-gray-600 text-sm mt-2">Every number represents a life changed, a community strengthened, and a future made brighter.</p>
            </div>

            <div className="bg-gray-50 p-8 sm:p-10 rounded-3xl border border-gray-100 max-w-3xl mx-auto shadow-sm scroll-animate">
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Active Campaigns</h3>
                <div className="space-y-6">
                    <div>
                        <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                            <span>Clean Water Initiative</span>
                            <span>78% of $500K</span>
                        </div>
                        <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                            <div className="bg-teal-600 h-full rounded-full transition-all duration-1000" style={{width: '78%'}}></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                            <span>School Building Fund</span>
                            <span>45% of $2M</span>
                        </div>
                        <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                            <div className="bg-teal-600 h-full rounded-full transition-all duration-1000" style={{width: '45%'}}></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                            <span>Medical Supplies</span>
                            <span>92% of $100K</span>
                        </div>
                        <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                            <div className="bg-teal-600 h-full rounded-full transition-all duration-1000" style={{width: '92%'}}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Stories / Reviews Section */}
      <section id="stories" className="py-24 bg-gray-50/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 scroll-animate">
                <span className="bg-teal-50 text-teal-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-teal-100">Stories & Reviews</span>
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-3">Lives Transformed</h2>
                <p className="text-gray-600 text-sm mt-2">Behind every statistic is a human story. Read genuine reviews from people whose lives have been changed.</p>
            </div>

            <div className="relative w-full overflow-hidden py-4 scroll-animate">
                <div id="review-track" className="flex gap-8 transition-transform duration-700 ease-in-out">
                    <div className="min-w-[320px] sm:min-w-[380px] bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between space-y-6 hover-lift">
                        <div className="text-teal-600 text-2xl"><i className="fa-solid fa-quote-left"></i></div>
                        <p className="text-sm text-gray-600 leading-relaxed">&ldquo;When Flourish built a school in our village, everything changed. My daughter was the first girl in our family to learn to read. Now she dreams of becoming a doctor.&rdquo;</p>
                        <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                            <div className="w-10 h-10 rounded-full font-bold flex items-center justify-center text-white bg-teal-700">AD</div>
                            <div>
                                <h5 className="font-bold text-xs text-gray-900">Amara Diallo</h5>
                                <p className="text-[10px] text-gray-500">Senegal, West Africa</p>
                            </div>
                        </div>
                    </div>

                    <div className="min-w-[320px] sm:min-w-[380px] bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between space-y-6 hover-lift">
                        <div className="text-teal-600 text-2xl"><i className="fa-solid fa-quote-left"></i></div>
                        <p className="text-sm text-gray-600 leading-relaxed">&ldquo;The clean water well transformed our community. Children stopped getting sick, and women no longer walked miles for water, and we could focus on growing our farms.&rdquo;</p>
                        <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                            <div className="w-10 h-10 rounded-full font-bold flex items-center justify-center text-white bg-teal-700">JK</div>
                            <div>
                                <h5 className="font-bold text-xs text-gray-900">Joseph Kariuki</h5>
                                <p className="text-[10px] text-gray-500">Kenya, East Africa</p>
                            </div>
                        </div>
                    </div>

                    <div className="min-w-[320px] sm:min-w-[380px] bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between space-y-6 hover-lift">
                        <div className="text-teal-600 text-2xl"><i className="fa-solid fa-quote-left"></i></div>
                        <p className="text-sm text-gray-600 leading-relaxed">&ldquo;The microloan program gave me the start I needed. I built a small tailoring business that now employs five women from my village. We are lifting each other up.&rdquo;</p>
                        <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                            <div className="w-10 h-10 rounded-full font-bold flex items-center justify-center text-white bg-teal-700">PS</div>
                            <div>
                                <h5 className="font-bold text-xs text-gray-900">Priya Sharma</h5>
                                <p className="text-[10px] text-gray-500">Rajasthan, India</p>
                            </div>
                        </div>
                    </div>

                    <div className="min-w-[320px] sm:min-w-[380px] bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between space-y-6 hover-lift">
                        <div className="text-teal-600 text-2xl"><i className="fa-solid fa-quote-left"></i></div>
                        <p className="text-sm text-gray-600 leading-relaxed">&ldquo;The medical outreach program saved countless lives during the malaria outbreak. I am forever grateful for the selfless volunteers of Flourish.&rdquo;</p>
                        <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                            <div className="w-10 h-10 rounded-full font-bold flex items-center justify-center text-white bg-teal-700">EM</div>
                            <div>
                                <h5 className="font-bold text-xs text-gray-900">Emmanuel Mensah</h5>
                                <p className="text-[10px] text-gray-500">Accra, Ghana</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section id="get-involved" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 scroll-animate">
                <span className="bg-teal-50 text-teal-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-teal-100">Get Involved</span>
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-3">Join Our Mission</h2>
                <p className="text-gray-600 text-sm mt-2">There are many ways to make a difference. Whether you give your time, your skills, or your support, every contribution matters.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-50/50 p-8 rounded-3xl border border-gray-100 text-center space-y-4 hover-lift scroll-animate">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto text-xl">
                        <i className="fa-solid fa-users"></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Volunteer</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">Give your time and skills to make a direct impact. Join field missions, teach workshops, or help with local events.</p>
                    <button onClick={openVolunteerModal} className="inline-block text-teal-600 font-bold text-xs uppercase tracking-wider hover:underline pt-2">Start Volunteering &rarr;</button>
                </div>

                <div className="bg-gray-50/50 p-8 rounded-3xl border border-gray-100 text-center space-y-4 hover-lift scroll-animate">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto text-xl">
                        <i className="fa-solid fa-dollar-sign"></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Fundraise</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">Start a fundraising campaign for a cause you care about. Every dollar raised goes directly to the communities we serve.</p>
                    <button onClick={openDonateModal} className="inline-block text-teal-600 font-bold text-xs uppercase tracking-wider hover:underline pt-2">Start a Campaign &rarr;</button>
                </div>

                <div className="bg-gray-50/50 p-8 rounded-3xl border border-gray-100 text-center space-y-4 hover-lift scroll-animate">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto text-xl">
                        <i className="fa-solid fa-briefcase"></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Partner</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">Corporate and organizational partnerships amplify our impact. Join us as a partner and help us reach more communities.</p>
                    <button onClick={openPartnerModal} className="inline-block text-teal-600 font-bold text-xs uppercase tracking-wider hover:underline pt-2">Become a Partner &rarr;</button>
                </div>
            </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-gray-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 scroll-animate">
                <span className="bg-teal-50 text-teal-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-teal-100">FAQ</span>
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-3">Frequently Asked Questions</h2>
                <p className="text-gray-600 text-sm mt-2">Find answers to common questions about our organization, donations, and volunteer opportunities.</p>
            </div>

            <div className="space-y-4 scroll-animate">
                <details className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm group cursor-pointer transition">
                    <summary className="flex justify-between items-center font-bold text-sm text-gray-900">
                        <span>Are my donations tax-deductible?</span>
                        <i className="fa-solid fa-plus text-teal-600 text-sm group-open:rotate-45 transition duration-300"></i>
                    </summary>
                    <p className="text-xs text-gray-600 mt-3 leading-relaxed">Yes, Flourish Foundation is a registered nonprofit organization. All donations are tax-deductible to the extent allowed by law.</p>
                </details>
                <details className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm group cursor-pointer transition">
                    <summary className="flex justify-between items-center font-bold text-sm text-gray-900">
                        <span>How are funds allocated?</span>
                        <i className="fa-solid fa-plus text-teal-600 text-sm group-open:rotate-45 transition duration-300"></i>
                    </summary>
                    <p className="text-xs text-gray-600 mt-3 leading-relaxed">88% of all donations go directly to field programs and community empowerment initiatives.</p>
                </details>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="donate" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="space-y-4">
                <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-teal-600 flex items-center justify-center text-white font-bold shadow-md group-hover:scale-110 transition duration-300">
                    <img src="images/IMG-20261020-WA0123.jpg" alt="Flourish Foundation Logo" className="w-10 h-10 object-cover rounded-full" />
                </div>
                    <span className="text-lg font-black tracking-tight">Florish</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">Empowering communities and changing lives through sustainable grassroots programs worldwide.</p>
            </div>
            <div>
                <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-teal-400">Quick Links</h4>
                <ul className="space-y-2 text-xs text-gray-400">
                    <li><a href="#about" className="hover:text-white transition">About Us</a></li>
                    <li><a href="#mission" className="hover:text-white transition">Our Mission</a></li>
                    <li><a href="#programs" className="hover:text-white transition">Programs</a></li>
                    <li><a href="#impact" className="hover:text-white transition">Impact Metrics</a></li>
                </ul>
            </div>
            <div className="space-y-2">
                <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-teal-400">Contact Info</h4>
                <p className="text-gray-400 text-xs">29 Unity Estate, Iriebe, Port Harcourt, Rivers State</p>
                <p className="text-gray-400 text-xs">+234 (0) 90 778 044 47</p>
                <p className="text-gray-400 text-xs">florishfoundation01@gmail.com</p>
            </div>
            <div>
                <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-teal-400">Get Involved</h4>
                <ul className="space-y-2 text-xs text-gray-400">
                    <li><button onClick={openVolunteerModal} className="hover:text-white transition">Volunteer</button></li>
                    <li><button onClick={openDonateModal} className="hover:text-white transition">Donate Now</button></li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-teal-400">Admin Tracking</h4>
                <p className="text-xs text-gray-400 mb-2">View verified foundation donations ledger.</p>
                <div className="flex space-x-2">
                    <button onClick={openAdminLoginModal} className="bg-teal-600 hover:bg-teal-700 text-xs px-3 py-2 rounded-lg font-bold transition">View Donations Log</button>
                    <button onClick={openAdminSignupModal} className="bg-gray-700 hover:bg-gray-600 text-xs px-3 py-2 rounded-lg font-bold transition">Admin Signup</button>
                </div>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
            &copy; 2026 Flourish Foundation. All Rights Reserved.
        </div>
      </footer>

      {/* SECURE DIRECT BANK TRANSFER DONATION MODAL */}
      <div id="donation-modal" className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm hidden items-center justify-center p-4">
        <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden transform scale-95 transition-all duration-300">
            <div className="bg-teal-600 text-white p-6 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <i className="fa-solid fa-heart text-xl text-amber-300"></i>
                    <h3 className="text-lg font-black">Direct Bank Transfer Donation</h3>
                </div>
                <button onClick={closeDonateModal} className="w-8 h-8 rounded-full bg-teal-700 hover:bg-teal-800 flex items-center justify-center text-white transition">
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
                <div id="step-1">
                    <p className="text-xs text-gray-500 mb-4 font-medium">Safe & Secure: Transfer directly to our official foundation bank accounts.</p>
                    
                    <div className="grid grid-cols-3 gap-3 mb-4">
                        <button type="button" onClick={(e) => setAmount(25, e.currentTarget)} className="amount-btn border-2 border-teal-600 text-teal-700 font-bold py-3 rounded-xl text-sm transition bg-teal-50">$25</button>
                        <button type="button" onClick={(e) => setAmount(50, e.currentTarget)} className="amount-btn border-2 border-gray-200 hover:border-teal-600 text-gray-700 font-bold py-3 rounded-xl text-sm transition">$50</button>
                        <button type="button" onClick={(e) => setAmount(100, e.currentTarget)} className="amount-btn border-2 border-gray-200 hover:border-teal-600 text-gray-700 font-bold py-3 rounded-xl text-sm transition">$100</button>
                    </div>

                    <div className="mb-4">
                        <label className="block text-xs font-bold text-gray-700 mb-1">Donation Amount ($)</label>
                        <input type="number" id="custom-amount" defaultValue="25" min="1" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 font-bold text-sm" />
                    </div>

                    <div className="space-y-4 mb-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                            <input type="text" id="donor-name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-sm" placeholder="John Doe" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                            <input type="email" id="donor-email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-sm" placeholder="john@example.com" />
                        </div>
                    </div>

                    <button onClick={goToBankDetails} className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-xl shadow-lg transition text-sm">
                        Proceed to Bank Details &rarr;
                    </button>
                </div>

                <div id="step-2" className="hidden space-y-4">
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs text-amber-800 space-y-1">
                        <p className="font-bold"><i className="fa-solid fa-triangle-exclamation mr-1"></i> Important Instructions:</p>
                        <p>Please make your transfer using the official bank details below.</p>
                    </div>

                    <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-3 font-mono text-sm">
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-500 text-xs">Bank Name:</span>
                            <strong className="text-gray-900">Zenith Bank</strong>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-500 text-xs">Account Name:</span>
                            <strong className="text-gray-900">Florish Foundation for Women and Youths</strong>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-500 text-xs">Account Number:</span>
                            <div className="flex items-center space-x-2">
                                <strong id="acc-num" className="text-teal-700 text-base">1228454538</strong>
                                <button onClick={copyAccNumber} className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-gray-700">Copy</button>
                            </div>
                        </div>
                    </div>

                    <div className="pt-2 flex space-x-3">
                        <button onClick={backToStep1} className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl text-xs transition">Back</button>
                        <button onClick={confirmTransfer} className="w-2/3 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl text-xs shadow-md transition">I Have Made The Transfer</button>
                    </div>
                </div>

                <div id="step-3" className="hidden text-center py-6 space-y-4">
                    <div className="w-16 h-16 bg-green-100 text-teal-600 rounded-full flex items-center justify-center mx-auto text-3xl animate-bounce">
                        <i className="fa-solid fa-check"></i>
                    </div>
                    <h4 className="text-2xl font-black text-gray-900">Thank You For Your Generosity!</h4>
                    <div className="bg-teal-50 p-4 rounded-xl border border-teal-100 text-xs text-teal-900 font-mono">
                        <p className="text-[10px] text-teal-600 font-bold uppercase">Donation Tracking Reference Code:</p>
                        <p id="tracking-ref-code" className="text-base font-black mt-1">FLR-98421-2026</p>
                    </div>
                    <button onClick={closeDonateModal} className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl text-xs hover:bg-gray-800 transition">Done</button>
                </div>
            </div>
        </div>
      </div>

      {/* ADMIN LOGIN MODAL */}
      <div id="admin-login-modal" className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm hidden items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl">
            <h3 className="text-lg font-black text-gray-900 mb-4">Admin Login</h3>
            <form onSubmit={handleAdminLogin} className="space-y-4">
                <input type="text" id="admin-login-user" required className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" placeholder="Username" />
                <input type="password" id="admin-login-pass" required className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" placeholder="Password" />
                <button type="submit" className="w-full bg-teal-600 text-white font-bold py-3 rounded-xl text-xs">Login</button>
            </form>
            <button onClick={closeAdminLoginModal} className="w-full mt-2 bg-gray-100 text-gray-700 py-2 rounded-xl text-xs">Cancel</button>
        </div>
      </div>

      {/* ADMIN SIGNUP MODAL */}
      <div id="admin-signup-modal" className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm hidden items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl">
            <h3 className="text-lg font-black text-gray-900 mb-4">Create Admin Account</h3>
            <form onSubmit={handleAdminSignup} className="space-y-4">
                <input type="text" id="admin-signup-user" required className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" placeholder="New Username" />
                <input type="password" id="admin-signup-pass" required className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" placeholder="New Password" />
                <button type="submit" className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl text-xs">Register Admin</button>
            </form>
            <button onClick={closeAdminSignupModal} className="w-full mt-2 bg-gray-100 text-gray-700 py-2 rounded-xl text-xs">Cancel</button>
        </div>
      </div>

      {/* ADMIN TRACKER LEDGER MODAL */}
      <div id="admin-modal" className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm hidden items-center justify-center p-4">
        <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
                <div>
                    <h3 className="text-lg font-black text-gray-900">Foundation Donations Ledger</h3>
                    <p className="text-xs text-gray-500">Live secure tracking log of all recorded donor contributions.</p>
                </div>
                <button onClick={closeAdminTracker} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700">
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>

            <div className="max-h-60 overflow-y-auto">
                <table className="w-full text-left text-xs">
                    <thead className="bg-gray-50 text-gray-600 uppercase border-b">
                        <tr>
                            <th className="p-3">Ref Code</th>
                            <th className="p-3">Donor Name</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">Status</th>
                            <th className="p-3 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody id="ledger-table-body" className="divide-y text-gray-700">
                        {/* Populated dynamically via MongoDB API */}
                    </tbody>
                </table>
            </div>

            <button onClick={closeAdminTracker} className="w-full bg-gray-900 text-white py-3 rounded-xl text-xs font-bold">Close Ledger</button>
        </div>
      </div>
    </div>
  );
}

// Global modal and action handlers
function setAmount(val: number, btn: HTMLElement) {
    const customInput = document.getElementById('custom-amount') as HTMLInputElement;
    if (customInput) customInput.value = val.toString();
    
    document.querySelectorAll('.amount-btn').forEach(b => {
        b.classList.remove('border-teal-600', 'text-teal-700', 'bg-teal-50');
        b.classList.add('border-gray-200', 'text-gray-700');
    });
    btn.classList.remove('border-gray-200', 'text-gray-700');
    btn.classList.add('border-teal-600', 'text-teal-700', 'bg-teal-50');
}

function copyAccNumber() {
    const accNum = document.getElementById('acc-num')?.innerText || '1228454538';
    navigator.clipboard.writeText(accNum);
    alert('Account number copied to clipboard!');
}

function openDonateModal() {
    const modal = document.getElementById('donation-modal');
    if(modal) { modal.classList.remove('hidden'); modal.classList.add('flex'); }
}
function closeDonateModal() {
    const modal = document.getElementById('donation-modal');
    if(modal) { 
        modal.classList.add('hidden'); 
        modal.classList.remove('flex'); 
        document.getElementById('step-1')?.classList.remove('hidden');
        document.getElementById('step-2')?.classList.add('hidden');
        document.getElementById('step-3')?.classList.add('hidden');
    }
}
function goToBankDetails() {
    document.getElementById('step-1')?.classList.add('hidden');
    document.getElementById('step-2')?.classList.remove('hidden');
}
function backToStep1() {
    document.getElementById('step-2')?.classList.add('hidden');
    document.getElementById('step-1')?.classList.remove('hidden');
}
async function confirmTransfer() {
    const name = (document.getElementById('donor-name') as HTMLInputElement)?.value || 'Anonymous';
    const amount = (document.getElementById('custom-amount') as HTMLInputElement)?.value || '25';
    const refCode = 'FLR-' + Math.floor(10000 + Math.random() * 90000) + '-2026';
    try {
        await fetch('/api/donations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ref: refCode, name, amount: '$' + amount, status: 'Pending Verification' })
        });
    } catch (err) { console.error(err); }
    const refEl = document.getElementById('tracking-ref-code');
    if(refEl) refEl.innerText = refCode;
    document.getElementById('step-2')?.classList.add('hidden');
    document.getElementById('step-3')?.classList.remove('hidden');
}
function openAdminLoginModal() {
    document.getElementById('admin-login-modal')?.classList.remove('hidden');
    document.getElementById('admin-login-modal')?.classList.add('flex');
}
function closeAdminLoginModal() {
    document.getElementById('admin-login-modal')?.classList.add('hidden');
    document.getElementById('admin-login-modal')?.classList.remove('flex');
}
function openAdminSignupModal() {
    document.getElementById('admin-signup-modal')?.classList.remove('hidden');
    document.getElementById('admin-signup-modal')?.classList.add('flex');
}
function closeAdminSignupModal() {
    document.getElementById('admin-signup-modal')?.classList.add('hidden');
    document.getElementById('admin-signup-modal')?.classList.remove('flex');
}
async function handleAdminLogin(e: React.FormEvent) {
    e.preventDefault();
    const username = (document.getElementById('admin-login-user') as HTMLInputElement)?.value;
    const password = (document.getElementById('admin-login-pass') as HTMLInputElement)?.value;
    try {
        const res = await fetch('/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if(data.success) {
            closeAdminLoginModal();
            openAdminTracker();
        } else { alert('Access Denied: Invalid credentials'); }
    } catch(err) { console.error(err); }
}
async function handleAdminSignup(e: React.FormEvent) {
    e.preventDefault();
    const username = (document.getElementById('admin-signup-user') as HTMLInputElement)?.value;
    const password = (document.getElementById('admin-signup-pass') as HTMLInputElement)?.value;
    try {
        const res = await fetch('/api/admin/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        alert(data.message);
        if(data.success) closeAdminSignupModal();
    } catch(err) { console.error(err); }
}
async function openAdminTracker() {
    try {
        const res = await fetch('/api/donations');
        const donations = await res.json();
        const tbody = document.getElementById('ledger-table-body');
        if(tbody) {
            tbody.innerHTML = donations.map((item: any) => `
                <tr class="border-b">
                    <td class="p-3 font-mono">${item.ref}</td>
                    <td class="p-3 font-semibold">${item.name}</td>
                    <td class="p-3">${item.amount}</td>
                    <td class="p-3"><span class="px-2 py-1 rounded-full text-[10px] font-bold ${item.status === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}">${item.status}</span></td>
                    <td class="p-3 text-right">
                        ${item.status !== 'Verified' ? `<button onclick="approveDonation('${item._id}')" class="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded-lg text-[10px] font-bold transition">Verify</button>` : '<span class="text-gray-400 text-[10px]">Approved</span>'}
                    </td>
                </tr>
            `).join('');
        }
    } catch(err) { console.error(err); }
    document.getElementById('admin-modal')?.classList.remove('hidden');
    document.getElementById('admin-modal')?.classList.add('flex');
}

async function approveDonation(id: string) {
    try {
        const res = await fetch('/api/donations', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, status: 'Verified' })
        });
        const data = await res.json();
        if(data.success) {
            openAdminTracker(); // Refresh ledger table
        } else {
            alert('Failed to update donation status');
        }
    } catch (err) {
        console.error(err);
    }
}

function closeAdminTracker() {
    document.getElementById('admin-modal')?.classList.add('hidden');
    document.getElementById('admin-modal')?.classList.remove('flex');
}
function openVolunteerModal() {}
function openPartnerModal() {}