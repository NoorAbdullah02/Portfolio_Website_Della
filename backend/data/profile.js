// Grounding context for the AI assistant. Kept as a plain string so it can
// be dropped straight into the system prompt — this is the only "knowledge"
// the assistant is allowed to draw on about Della.
export const PROFILE_CONTEXT = `
Name: Mursheda Nusrat Della
Location: Laxmipur Vatapara, Rajshahi, Bangladesh
Email: nusratdella.026@bauet.ac.bd | Phone: +8801707533471
LinkedIn: https://www.linkedin.com/in/nusratdella026

CURRENT ROLE
Lecturer, Department of Information & Communication Engineering (ICE),
Bangladesh Army University of Engineering and Technology (BAUET), Natore.
December 2022 - Present.

EDUCATION
- M.Sc. in Information & Communication Technology, Islamic University, Kushtia, Bangladesh. Pursuing.
- M.Sc. in Computer Science & Engineering, Rajshahi University of Engineering & Technology (RUET). 2026, CGPA 3.50/4.00.
- B.Sc. in Information & Communication Engineering, BAUET, Natore. 2022, CGPA 3.85/4.00.
- HSC (Science), Rajshahi Govt. City College, Rajshahi. 2017, GPA 5.00.
- SSC (Science), Mission Girls High School, Rajshahi. 2015, GPA 5.00.

EMPLOYMENT HISTORY
1. Lecturer, ICE Dept, BAUET, Natore — Dec 2022 to present.
2. Sales and Records Officer (Part-time), AmazonPify Ltd (part of Amazon BD) — Sep-Dec 2022.
3. Brand Promoter (Intern), Uber Technologies Inc, Rajshahi — Feb-May 2021.
4. Technological Engineer (Intern), Grameenphone (GP), Rajshahi — 1 month.
5. Fast Track Future Leader (Intern), HyperTag Solution Limited, Dhaka — 3 months.
6. Graphics Design (Intern), Women ICT Freelancer and Entrepreneur Development,
   Rajshahi City Corporation — 3 months.

RESEARCH INTERESTS
Artificial Intelligence, Digital Image Processing, Machine Learning,
Computer Vision, Data Communication and Computer Networks.

THESES
- M.Sc. Thesis: "CT-CoherXAI: A Coherence-Driven, Explainable Ensemble Framework
  for Lung Cancer Classification from Chest CT Images."
- B.Sc. Thesis: "Developing Generalized Models for COVID-19 Detection by AI Approach."

PUBLICATIONS (10 total, book chapters, journal & IEEE conference papers)
1. Book Chapter: COVID-19 Distance Learning Understanding Classification Using Scalogram Based on Transfer Learning and Principal Feature Classifier from EEG Signals. M. M. Haque, S. K. Paul, R. R. Paul, M. K. Islam, Mursheda Nusrat Della*, and S. Fahim. Machine Learning for Healthcare Informatics, Chapman and Hall/CRC, Taylor & Francis, 2026, pp. 127–145. DOI: 10.1201/9781032650715-10. (Co-author)
2. CT-CoherXAI: A Coherence-Driven, Explainable Ensemble Framework for Lung Cancer Classification from Chest CT Images. Della*, Dr. Md. Shahid Uz Zaman. Presented at: IEEE QPAIN 2026, CUET, Chattogram, April 16-18, 2026. (Lead author)
3. Design and Performance Evaluation of a Microstrip Patch Antenna for CubeSats Application. Mst. Rabeya Khatun Rikta, Md. Arafat Hossain, Humaira Rashid Koli, A.B.M. Kabir Hossain, Partha Pratim Debnath, Mursheda Nusrat Della*. IEEE QPAIN 2026, April 16-18, 2026. (Co-author)
4. Advancing Brain Stroke Prediction Through Attention-Based Neural Architectures for Temporal Data Analysis. Tasnim Tabassum, Md. Appel Mahmud Pranto, Mursheda Nusrat Della*, A.B.M. Kabir Hossain, Md. Arafat Hossain, Partha Pratim Debnath. IEEE COMPAS 2025, Islamic University, Kushtia, October 23-24, 2025. (Co-author)
5. Screening depression among university students utilizing GHQ-12 and machine learning. Nasirul Mumenin, A.B.M. Kabir Hossain, Md. Rubel Basar, Md. Arafat Hossain, Partha Pratim Debnath, Mursheda Nusrat Della*, Md. Mahmudul Hasan Rashed, Afzal Hossen, Md. Sejan Hossain. Heliyon, Vol 10, Issue 17, September 15, 2024, e37182. (Co-author)
6. Developing Generalized Models for COVID-19 Detection and Outbreak Prediction by AI Approach. Partha Pratim Debnath, Erona Moumita, Mursheda Nusrat Della*, Md. Lincon Hasan. Journal of Engineering and Applied Science, Vol 07, No 01, pp. 72–80, December 2023. (Co-author)
7. Blockchain Based Secure and Decentralized Smart Licensing of Charging Vehicles for Rajshahi City Corporation. Md. Momenul Haque, Subrata Kumer Paul, Md. Kamrul Islam, Mursheda Nusrat Della*, Rakhi Rani Paul, Sultan Fahim. IEEE ICICT4SD 2023, Dhaka, pp. 204-208. (Co-author)
8. A Real-time Attendance Monitoring System for Election Voter using Face Recognition Approach. Md. Momenul Haque, Subrata Kumer Paul, Rakhi Rani Paul, Mursheda Nusrat Della*, Md. Kamrul Islam. IEEE CS BDC Summer Symposium 2023, 26-27 May 2023. (Co-author)
9. EEG-Based Multi-Class Emotion Recognition using Hybrid LSTM Approach. Md. Momenul Haque, Subrata Kumer Paul, Rakhi Rani Paul, Mursheda Nusrat Della*, Md. Kamrul Islam, Sultan Fahim. IJIRCST, Vol 11, Issue 3, May 2023. (Co-author)
10. D-Shaped Photonic Crystal Fiber Plasmonic Bio-Sensor for Biomaterial Detection. Nazmul Hussain, K.M. Mesbahuzzaman Asik, Rauffur Rahim, Nazmul Hasan Nakib, Mursheda Nusrat Della*. IJCSPUB, Volume 13, Issue 2, May 2023. (Co-author)

PROJECTS
- Student Management System Website (Java, PHP, JavaScript, HTML) — Programmer, Testing, Idea.
- Attendance Management System (PHP, JavaScript, HTML) — Programmer, Testing, Idea.
- Campus Network Design (Cisco Packet Tracer, CLI) — Programmer.
- Password-Based Door Lock Security System (Arduino Uno, C++, Keypad) — Programmer, Designer, Idea.
- Blood Pressure Monitoring System (Arduino Uno, C++) — Programmer, Designer, Idea.

TEACHING INTERESTS
Fundamentals of ICT, Digital Electronics, Structured Programming (C), OOP (C++),
Data Structures & Algorithms, Java & Network Programming, AI & Neural Networks,
Information Theory & Coding, Internet & Web Programming, Data Communication,
Wireless Communication, Optical Fiber Communication, Computer Networks,
System Analysis & Software Engineering, Network Security & Cyber Law,
Digital Signal Processing, Database Management Systems.

TECHNICAL SKILLS
Languages: C, C++, Python (ML), Java, PHP.
Database: MySQL.
Web: HTML, CSS, Bootstrap, React JS.
OS: Windows.

ACHIEVEMENTS
Dean's Award (BAUET, 2020-21); Champion & Best Speaker - BAUET Debate Competition
(2021); Champion & Best Speaker - Intra Department Debating Program (2021);
Participant, Team BAUET - Prothom Alo Bondhusova (RU, 2020); Champion & Best
Speaker - Intra University Debating Program (2019); Champion - Woman ICT Day
Graphics Design Competition (2018); Champion & Best Speaker - Intra College
Debating Program (2016); Champion - Rajshahi Debating Club Program (2013);
Division Champion - Matador Master Buster (2013).

LEADERSHIP & EXTRA-CURRICULAR
Assistant Advisor - BAUET ICT Club (2023-present); Assistant Advisor - BAUET
Debating Society (2023-present); Assistant Advisor - BAUET Games, Sports &
Gymnasium Club (2023-present); General Secretary - BAUET ICT Club (2021-22);
General Secretary - BAUET Debating Society (2020-22); Head of Public & Relations -
Hult Prize at BAUET (2021-22); Department Ambassador - Mind Strome 2.00 (2021);
Executive Member - BAUET Career Club (2018-19); Trainer - Graphics Design
Workshop, RCC (2018, 3 months).

PERSONAL SKILLS
Organizational leadership, project management, strong decision-making, complex
problem solving, graphics design, public worker, service-focused.

LANGUAGES
English: professional fluency, IELTS overall 6.50 (Listening 6, Reading 6.5,
Writing 6, Speaking 6.5). Bangla: native.

REFERENCES
- Partha Pratim Debnath, Associate Professor & Head, Department of ICE, Bangladesh Army University of Engineering & Technology (BAUET). Phone: +8801746377565
- A.B.M Kabir Hossain, Assistant Professor, Department of ICE, Bangladesh Army University of Engineering & Technology (BAUET). Phone: +8801913910146
`.trim()
