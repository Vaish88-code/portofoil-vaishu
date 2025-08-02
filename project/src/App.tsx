import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';
import { 
  Github, 
  ExternalLink, 
  Download, 
  Mail, 
  Linkedin, 
  Menu,
  X,
  Code2,
  Database,
  Globe,
  Smartphone,
  Terminal,
  GitBranch,
  User,
  BookOpen,
  Briefcase,
  Phone
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const handleDownloadResume = () => {
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = '/Vaishnavi Resume (2).docx';
    link.download = 'Vaishnavi_Gaikwad_Resume.docx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [isHovering, setIsHovering] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'roadmap', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Initialize EmailJS with your public key
  useEffect(() => {
    emailjs.init('UWE0iseZuRfY4R_Hj');
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const [emailSending, setEmailSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailSending(true);
    setEmailError(null);
    
    // EmailJS configuration with your actual service and template IDs
    const serviceId = 'service_9vn1pb2';
    const templateId = 'template_rbp2r4q';
    
    // Prepare template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_name: 'Vaishnavi',
      to_email: 'vg2530774@gmail.com'
    };
    
    emailjs.send(serviceId, templateId, templateParams)
      .then((response) => {
        console.log('Email sent successfully!', response);
        setEmailSent(true);
        setEmailSending(false);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setEmailSent(false), 5000); // Reset success message after 5 seconds
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
        
        setEmailError(`Failed to send message: ${error.text || 'Please try again later'}`);
        
        setEmailSending(false);
      });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'roadmap', label: 'Journey' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  const skills = [
    { name: 'Java', icon: Code2, level: 90 },
    { name: 'Kotlin', icon: Smartphone, level: 85 },
    { name: 'HTML', icon: Globe, level: 95 },
    { name: 'CSS', icon: Globe, level: 90 },
    { name: 'C++', icon: Code2, level: 80 },
    { name: 'Git', icon: GitBranch, level: 85 }
  ];

  const projects = [
    {
      title: 'Canteen Management',
      description: 'A comprehensive canteen management system for educational institutions with order tracking and menu management.',
      stack: ['HTML', 'CSS', 'React JS'],
      github: 'https://github.com/Vaish88-code/canteenmanagement',
      live: 'https://canteenmanage.netlify.app/',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      title: 'Safe2PG',
      description: 'A safety-focused platform for finding secure PG accommodations with location tracking and verification.',
      stack: ['JavaScript','React JS'],
      github: 'https://github.com/Vaish88-code/safe2pg',
      live: 'https://safe2pg.netlify.app/',
      image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      title: 'Celebrate',
      description: 'An event planning and celebration management platform with booking and customization features.',
      stack: ['HTML', 'React JS', 'CSS'],
      github: 'https://github.com/Vaish88-code/celebrate',
      live: 'https://celebratebliss.netlify.app/',
      image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      title: 'Matrimonial',
      description: 'A modern matrimonial platform connecting people with advanced matching algorithms and secure profiles.',
      stack: ['JavaScript', 'React JS', 'HTML'],
      github: 'https://github.com/Vaish88-code/matrimonial',
      live: 'https://serene-hamster-36c26d.netlify.app/',
      image: 'https://images.pexels.com/photos/265722/pexels-photo-265722.jpeg?auto=compress&cs=tinysrgb&w=500'
    }
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="bg-white text-gray-900 font-inter relative overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-indigo-200/20 to-purple-200/20 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
          style={{ top: '10%', left: '10%' }}
        />
        <motion.div
          className="absolute w-80 h-80 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * -0.015,
            y: mousePosition.y * -0.015,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
          style={{ top: '60%', right: '10%' }}
        />
        
      </div>

      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-200"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl font-bold text-indigo-600"
            >
              Vaishnavi
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`font-medium transition-all duration-300 hover:scale-105 ${
                    activeSection === item.id
                      ? 'text-indigo-600'
                      : 'text-gray-700 hover:text-indigo-600'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4"
            >
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left py-2 font-medium transition-all duration-300 hover:translate-x-2 ${
                    activeSection === item.id
                      ? 'text-indigo-600'
                      : 'text-gray-700 hover:text-indigo-600'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-indigo-600 font-medium mb-4"
            >
              Hello, I'm
            </motion.p>
            
            <motion.h1 
              className="text-5xl lg:text-6xl font-bold mb-6 text-gray-900"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Vaishnavi Gaikwad
            </motion.h1>
            
            <motion.h2 
              className="text-2xl lg:text-3xl font-medium mb-6 text-gray-600"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Java & Kotlin Developer
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              I build user-friendly and impactful applications that solve real-world problems with clean, efficient code.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                onClick={handleDownloadResume}
                onClick={handleDownloadResume}
                onClick={() => scrollToSection('projects')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
              </motion.button>
              <motion.button 
                className="border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={20} />
                Download CV
              </motion.button>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative"
          >
            <div className="relative w-80 h-80 mx-auto lg:w-96 lg:h-96">
              {/* Main circular container */}
              <motion.div 
                className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center relative overflow-hidden"
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.02, 1]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <motion.div 
                  className="w-64 h-64 lg:w-80 lg:h-80 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full flex items-center justify-center relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Main profile image */}
                  <motion.img
                    src="/image.png"
                    alt="Vaishnavi Gaikwad"
                    className="w-48 h-48 lg:w-60 lg:h-60 object-cover rounded-full border-4 border-white shadow-lg"
                    animate={{ 
                      y: [0, -10, 0],
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    whileHover={{ scale: 1.1 }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-gray-50 relative z-10">
        <div className="max-w-6xl mx-auto">
          {(() => {
            const { ref, inView } = useInView({
              threshold: 0.3,
              triggerOnce: true
            });
            
            return (
              <motion.div
                ref={ref}
                variants={fadeInUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="text-center mb-16"
              >
                <motion.h2 
                  className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900"
                  variants={fadeInUp}
                >
                  About Me
                </motion.h2>
                <motion.div 
                  className="w-20 h-1 bg-indigo-600 mx-auto"
                  variants={scaleIn}
                  whileInView={{ scaleX: [0, 1] }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                />
              </motion.div>
            );
          })()}
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {(() => {
              const { ref, inView } = useInView({
                threshold: 0.3,
                triggerOnce: true
              });
              
              return (
                <motion.div
                  ref={ref}
                  variants={fadeInLeft}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                >
                  <motion.div 
                    className="w-64 h-64 mx-auto bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg overflow-hidden"
                    whileHover={{ 
                      scale: 1.05,
                      rotate: 2,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-indigo-200 to-purple-200 flex items-center justify-center">
                      <motion.img
                        src="/WhatsApp Image 2025-08-01 at 1.15.03 PM.jpeg"
                        alt="Vaishnavi Gaikwad"
                        className="w-full h-full object-cover"
                        animate={{ 
                          scale: [1, 1.05, 1],
                        }}
                        transition={{ 
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </div>
                </motion.div>
                </motion.div>
              );
            })()}
            
            {(() => {
              const { ref, inView } = useInView({
                threshold: 0.3,
                triggerOnce: true
              });
              
              return (
                <motion.div
                  ref={ref}
                  variants={staggerContainer}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                >
                  <motion.h3 
                    className="text-2xl font-bold mb-6 text-gray-900"
                    variants={fadeInUp}
                  >
                    I'm Vaishnavi Gaikwad, a passionate developer
                  </motion.h3>
                  <motion.p 
                    className="text-gray-600 mb-6 leading-relaxed"
                    variants={fadeInUp}
                  >
                    I'm a B.Tech Computer Science Engineering student at DY Patil College, Kolhapur. 
                    My journey in technology is driven by curiosity and a desire to create meaningful solutions 
                    that make a difference in people's lives.
                  </motion.p>
                  <motion.p 
                    className="text-gray-600 mb-8 leading-relaxed"
                    variants={fadeInUp}
                  >
                    When I'm not coding, you'll find me exploring new technologies, contributing to open-source 
                    projects, or planning my next innovative application that could impact the world.
                  </motion.p>
                  
                  <motion.div 
                    className="grid grid-cols-2 gap-6"
                    variants={staggerContainer}
                  >
                    {[
                      { label: 'Name:', value: 'Vaishnavi Gaikwad' },
                      { label: 'Email:', value: 'vg2530774@gmail.com' },
                      { label: 'Phone:', value: '+91 7411382100' },
                      { label: 'Location:', value: 'Kolhapur, India' }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        variants={fadeInUp}
                        whileHover={{ scale: 1.05, x: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <h4 className="font-semibold text-gray-900 mb-2">{item.label}</h4>
                        <p className="text-gray-600">{item.value}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {(() => {
            const { ref, inView } = useInView({
              threshold: 0.3,
              triggerOnce: true
            });
            
            return (
              <motion.div
                ref={ref}
                variants={fadeInUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="text-center mb-16"
              >
                <motion.h2 
                  className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900"
                  variants={fadeInUp}
                >
                  My Skills
                </motion.h2>
                <motion.div 
                  className="w-20 h-1 bg-indigo-600 mx-auto"
                  variants={scaleIn}
                  whileInView={{ scaleX: [0, 1] }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                />
              </motion.div>
            );
          })()}
          
          {(() => {
            const { ref, inView } = useInView({
              threshold: 0.2,
              triggerOnce: true
            });
            
            return (
              <motion.div 
                ref={ref}
                className="grid md:grid-cols-2 gap-8"
                variants={staggerContainer}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    variants={fadeInUp}
                    className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                    whileHover={{ 
                      scale: 1.05,
                      y: -10,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                    }}
                  >
                    <div className="flex items-center mb-4">
                      <motion.div 
                        className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <skill.icon size={24} className="text-indigo-600" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900">{skill.name}</h3>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <motion.div
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                            viewport={{ once: true }}
                          />
                        </div>
                        <motion.span 
                          className="text-sm text-gray-600 mt-1"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 1 }}
                          viewport={{ once: true }}
                        >
                          {skill.level}%
                        </motion.span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            );
          })()}
        </div>
      </section>

      {/* Professional Roadmap Section */}
      <section id="roadmap" className="py-20 px-6 bg-gray-50 relative z-10">
        <div className="max-w-6xl mx-auto">
          {(() => {
            const { ref, inView } = useInView({
              threshold: 0.3,
              triggerOnce: true
            });
            
            return (
              <motion.div
                ref={ref}
                variants={fadeInUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="text-center mb-16"
              >
                <motion.h2 
                  className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900"
                  variants={fadeInUp}
                >
                  Professional Journey
                </motion.h2>
                <motion.div 
                  className="w-20 h-1 bg-indigo-600 mx-auto mb-6"
                  variants={scaleIn}
                  whileInView={{ scaleX: [0, 1] }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                />
                <motion.p 
                  className="text-gray-600 max-w-2xl mx-auto"
                  variants={fadeInUp}
                >
                  My career progression through meaningful internships and continuous learning
                </motion.p>
              </motion.div>
            );
          })()}
          
          {(() => {
            const { ref, inView } = useInView({
              threshold: 0.2,
              triggerOnce: true
            });
            
            const roadmapItems = [
              {
                year: '2024',
                title: 'Web Development Intern',
                company: 'Robowik Company',
                duration: '4 Months',
                mode: 'Online',
                description: 'Specialized in web development, building responsive applications and enhancing user experience through modern web technologies.',
                skills: ['HTML', 'CSS', 'JavaScript', 'React JS', 'Responsive Design'],
                status: 'completed',
                icon: Globe
              },
              {
                year: '2025',
                title: 'AI Research Intern',
                company: 'VG Software Company',
                duration: '6 Months',
                mode: 'Current',
                description: 'Diving deep into artificial intelligence research,  and contributing to innovative AI solutions.',
                skills: [ 'AI Research', 'Research Methodology'],
                status: 'current',
                icon: Terminal
              }
            ];
            
            return (
              <motion.div
                ref={ref}
                className="relative"
                variants={staggerContainer}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                {/* Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full hidden lg:block" />
                
                <div className="space-y-12 lg:space-y-24">
                  {roadmapItems.map((item, index) => (
                    <motion.div
                      key={index}
                      variants={index % 2 === 0 ? fadeInLeft : fadeInRight}
                      className={`flex flex-col lg:flex-row items-center gap-8 ${
                        index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                      }`}
                    >
                      {/* Content Card */}
                      <motion.div 
                        className="flex-1 bg-white rounded-xl shadow-lg p-8 border border-gray-100 relative"
                        whileHover={{ 
                          scale: 1.02,
                          y: -5,
                          boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Status Badge */}
                        <motion.div 
                          className={`absolute -top-3 -right-3 px-3 py-1 rounded-full text-xs font-semibold ${
                            item.status === 'completed' 
                              ? 'bg-green-100 text-green-700 border border-green-200' 
                              : 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                          }`}
                          whileHover={{ scale: 1.1 }}
                        >
                          {item.status === 'completed' ? '✓ Completed' : '🚀 Current'}
                        </motion.div>
                        
                        {/* Year Badge */}
                        <motion.div 
                          className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg font-bold text-lg mb-4"
                          whileHover={{ scale: 1.05 }}
                        >
                          {item.year}
                        </motion.div>
                        
                        <motion.h3 
                          className="text-2xl font-bold text-gray-900 mb-2"
                          whileHover={{ color: "#4f46e5" }}
                        >
                          {item.title}
                        </motion.h3>
                        
                        <motion.div 
                          className="flex items-center gap-2 mb-4"
                          variants={staggerContainer}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                        >
                          <motion.span 
                            className="text-indigo-600 font-semibold text-lg"
                            variants={fadeInUp}
                          >
                            {item.company}
                          </motion.span>
                          <motion.span 
                            className="text-gray-400"
                            variants={fadeInUp}
                          >
                            •
                          </motion.span>
                          <motion.span 
                            className="text-gray-600"
                            variants={fadeInUp}
                          >
                            {item.duration}
                          </motion.span>
                          <motion.span 
                            className="text-gray-400"
                            variants={fadeInUp}
                          >
                            •
                          </motion.span>
                          <motion.span 
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              item.mode === 'Online' 
                                ? 'bg-blue-100 text-blue-700' 
                                : 'bg-purple-100 text-purple-700'
                            }`}
                            variants={fadeInUp}
                          >
                            {item.mode}
                          </motion.span>
                        </motion.div>
                        
                        <motion.p 
                          className="text-gray-600 mb-6 leading-relaxed"
                          variants={fadeInUp}
                        >
                          {item.description}
                        </motion.p>
                        
                        {/* Skills Tags */}
                        <motion.div 
                          className="flex flex-wrap gap-2"
                          variants={staggerContainer}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                        >
                          {item.skills.map((skill, skillIndex) => (
                            <motion.span
                              key={skillIndex}
                              variants={scaleIn}
                              className="px-3 py-1 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 rounded-full text-sm font-medium border border-indigo-100"
                              whileHover={{ 
                                scale: 1.1,
                                backgroundColor: "#4f46e5",
                                color: "#ffffff",
                                borderColor: "#4f46e5"
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </motion.div>
                      </motion.div>
                      
                      {/* Timeline Node */}
                      <motion.div 
                        className="hidden lg:flex w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full items-center justify-center shadow-lg relative z-10"
                        whileHover={{ 
                          scale: 1.2,
                          rotate: 360,
                          boxShadow: "0 0 30px rgba(79, 70, 229, 0.5)"
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        <item.icon size={28} className="text-white" />
                      </motion.div>
                      
                      {/* Spacer for alternating layout */}
                      <div className="flex-1 hidden lg:block" />
                    </motion.div>
                  ))}
                </div>
                
                {/* Future Goals Section */}
                <motion.div
                  variants={fadeInUp}
                  className="mt-16 text-center"
                >
                  <motion.div 
                    className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8 border border-indigo-100"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 20px 40px rgba(79, 70, 229, 0.1)"
                    }}
                  >
                    <motion.h3 
                      className="text-2xl font-bold text-gray-900 mb-4"
                      whileHover={{ color: "#4f46e5" }}
                    >
                      🚀 What's Next?
                    </motion.h3>
                    <motion.p 
                      className="text-gray-600 max-w-2xl mx-auto leading-relaxed"
                      variants={fadeInUp}
                    >
                      Continuing to explore the intersection of web development and artificial intelligence, 
                      aiming to build innovative solutions that leverage both domains to create impactful applications 
                      for the future.
                    </motion.p>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })()}
        </div>
      </section>
      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {(() => {
            const { ref, inView } = useInView({
              threshold: 0.3,
              triggerOnce: true
            });
            
            return (
              <motion.div
                ref={ref}
                variants={fadeInUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="text-center mb-16"
              >
                <motion.h2 
                  className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900"
                  variants={fadeInUp}
                >
                  My Projects
                </motion.h2>
                <motion.div 
                  className="w-20 h-1 bg-indigo-600 mx-auto"
                  variants={scaleIn}
                  whileInView={{ scaleX: [0, 1] }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                />
              </motion.div>
            );
          })()}
          
          {(() => {
            const { ref, inView } = useInView({
              threshold: 0.2,
              triggerOnce: true
            });
            
            return (
              <motion.div 
                ref={ref}
                className="grid md:grid-cols-2 gap-8"
                variants={staggerContainer}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                {projects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    variants={index % 2 === 0 ? fadeInLeft : fadeInRight}
                    className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500"
                    whileHover={{ 
                      scale: 1.03,
                      y: -10,
                      rotateY: 5
                    }}
                  >
                    <div className="h-48 overflow-hidden relative">
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0"
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <div className="p-6">
                      <motion.h3 
                        className="text-xl font-bold mb-3 text-gray-900"
                        whileHover={{ color: "#4f46e5" }}
                        transition={{ duration: 0.2 }}
                      >
                        {project.title}
                      </motion.h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {project.description}
                      </p>
                      
                      <motion.div 
                        className="flex flex-wrap gap-2 mb-6"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        {project.stack.map((tech, techIndex) => (
                          <motion.span
                            key={tech}
                            variants={scaleIn}
                            className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium"
                            whileHover={{ 
                              scale: 1.1,
                              backgroundColor: "#4f46e5",
                              color: "#ffffff"
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </motion.div>
                      
                      <div className="flex space-x-4">
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 hover:border-indigo-600 rounded-lg transition-all duration-300 text-gray-700 hover:text-indigo-600"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Github size={18} />
                          <span>Code</span>
                        </motion.a>
                        <motion.a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all duration-300 text-white"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink size={18} />
                          <span>Live Demo</span>
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            );
          })()}
        </div>
      </section>

      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute w-2 h-2 bg-indigo-400/20 rounded-full"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ top: '20%', left: '10%' }}
        />
        <motion.div
          className="absolute w-3 h-3 bg-purple-400/15 rounded-full"
          animate={{
            x: [0, -40, 0],
            y: [0, 60, 0],
            scale: [1, 0.5, 1],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          style={{ top: '60%', right: '15%' }}
        />
        <motion.div
          className="absolute w-1.5 h-1.5 bg-indigo-300/25 rounded-full"
          animate={{
            x: [0, 30, 0],
            y: [0, -40, 0],
            rotate: [0, 360, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ top: '80%', left: '20%' }}
        />
      </div>

      {/* Parallax Background Shapes */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          className="absolute w-16 h-16 border border-indigo-200/20 rounded-full"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ 
            top: '10%', 
            right: '10%',
            transform: `translateY(${mousePosition.y * 0.01}px) translateX(${mousePosition.x * 0.01}px)`
          }}
        />
        <motion.div
          className="absolute w-12 h-12 border border-purple-200/15 rounded-lg"
          animate={{
            rotate: [0, -360],
            y: [0, -10, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ 
            bottom: '20%', 
            left: '5%',
            transform: `translateY(${mousePosition.y * -0.008}px) translateX(${mousePosition.x * -0.008}px)`
          }}
        />
      </div>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {(() => {
            const { ref, inView } = useInView({
              threshold: 0.3,
              triggerOnce: true
            });
            
            return (
              <motion.div
                ref={ref}
                variants={fadeInUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="text-center mb-16"
              >
                <motion.h2 
                  className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900"
                  variants={fadeInUp}
                >
                  Get In Touch
                </motion.h2>
                <motion.div 
                  className="w-20 h-1 bg-indigo-600 mx-auto mb-6"
                  variants={scaleIn}
                  whileInView={{ scaleX: [0, 1] }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                />
                <motion.p 
                  className="text-gray-600 max-w-2xl mx-auto"
                  variants={fadeInUp}
                >
                  I'm always open to discussing new opportunities, interesting projects, 
                  or just having a chat about technology. Feel free to reach out!
                </motion.p>
              </motion.div>
            );
          })()}
          
          <div className="grid lg:grid-cols-2 gap-12">
            {(() => {
              const { ref, inView } = useInView({
                threshold: 0.3,
                triggerOnce: true
              });
              
              return (
                <motion.div
                  ref={ref}
                  variants={fadeInLeft}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                >
                  <h3 className="text-2xl font-bold mb-6 text-gray-900">Contact Info</h3>
                  
                  <motion.div 
                    className="space-y-6"
                    variants={staggerContainer}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                  >
                    {[
                      { icon: Mail, title: 'Email', value: 'vg2530774@gmail.com' },
                      { icon: Phone, title: 'Phone', value: '+917411382100' },
                      { icon: Linkedin, title: 'LinkedIn', value: 'linkedin.com/in/vaishnavi-gaikwad', link: 'https://linkedin.com/in/vaishnavi-gaikwad' }
                    ].map((item, index) => (
                      <motion.div 
                        key={index}
                        variants={fadeInUp}
                        className="flex items-center space-x-4"
                        whileHover={{ x: 10, scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div 
                          className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center"
                          whileHover={{ rotate: 360, backgroundColor: "#4f46e5" }}
                          transition={{ duration: 0.6 }}
                        >
                          <item.icon size={20} className="text-indigo-600" />
                        </motion.div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{item.title}</h4>
                          {item.link ? (
                            <motion.a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-600 hover:text-indigo-700"
                              whileHover={{ scale: 1.05 }}
                            >
                              {item.value}
                            </motion.a>
                          ) : (
                            <p className="text-gray-600">{item.value}</p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              );
            })()}
            
            {(() => {
              const { ref, inView } = useInView({
                threshold: 0.3,
                triggerOnce: true
              });
              
              return (
                <motion.form
                  ref={(el) => {
                    ref(el);
                    if (formRef.current === null) {
                      formRef.current = el as HTMLFormElement;
                    }
                  }}
                  variants={fadeInRight}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  onSubmit={handleSubmit}
                  className="bg-white p-8 rounded-lg shadow-lg border border-gray-100"
                  whileHover={{ 
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    scale: 1.02
                  }}
                  transition={{ duration: 0.3 }}
                >

                  <motion.h3 
                    className="text-2xl font-bold mb-6 text-gray-900"
                    variants={fadeInUp}
                  >
                    Send Message
                  </motion.h3>
                  
                  <motion.div 
                    className="space-y-6"
                    variants={staggerContainer}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                  >
                    {[
                      { id: 'name', label: 'Full Name', type: 'text' },
                      { id: 'email', label: 'Email Address', type: 'email' }
                    ].map((field) => (
                      <motion.div key={field.id} variants={fadeInUp}>
                        <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-2">
                          {field.label}
                        </label>
                        <motion.input
                          type={field.type}
                          id={field.id}
                          name={field.id}
                          value={formData[field.id as keyof typeof formData]}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none transition-all duration-300"
                          whileFocus={{ 
                            scale: 1.02,
                            borderColor: "#4f46e5",
                            boxShadow: "0 0 0 3px rgba(79, 70, 229, 0.1)"
                          }}
                        />
                      </motion.div>
                    ))}
                    
                    <motion.div variants={fadeInUp}>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <motion.textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none transition-all duration-300 resize-none"
                        whileFocus={{ 
                          scale: 1.02,
                          borderColor: "#4f46e5",
                          boxShadow: "0 0 0 3px rgba(79, 70, 229, 0.1)"
                        }}
                      />
                    </motion.div>
                    
                    {emailSent && (
                      <motion.div 
                        className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg border border-green-200"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        Message sent successfully! I'll get back to you soon.
                      </motion.div>
                    )}
                    
                    {emailError && (
                      <motion.div 
                        className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg border border-red-200"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        {emailError}
                      </motion.div>
                    )}
                    
                    <motion.button
                      type="submit"
                      variants={fadeInUp}
                      className={`w-full ${emailSending ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center`}
                      whileHover={{ 
                        scale: emailSending ? 1 : 1.05,
                        boxShadow: emailSending ? 'none' : "0 10px 20px rgba(79, 70, 229, 0.3)"
                      }}
                      whileTap={{ scale: emailSending ? 1 : 0.95 }}
                      disabled={emailSending}
                    >
                      {emailSending ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : 'Send Message'}
                    </motion.button>
                  </motion.div>
                </motion.form>
              );
            })()}
          </div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer 
        className="py-8 px-6 bg-gray-900 text-white relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p 
              className="text-gray-400 mb-4 md:mb-0"
              variants={fadeInUp}
            >
              © 2024 Vaishnavi Gaikwad. All rights reserved.
            </motion.p>
            
            <motion.div 
              className="flex space-x-6"
              variants={fadeInUp}
            >
              <motion.a
                href="https://github.com/Vaish88-code"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                <Github size={24} />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/vaishnavi-gaikwad"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.2, rotate: -360 }}
                transition={{ duration: 0.3 }}
              >
                <Linkedin size={24} />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}

export default App;