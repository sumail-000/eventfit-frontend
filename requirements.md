 
© Department of Computer Science 
Faculty of Computing & IT 
University of Gujrat 
1 
 
Department of Computer Science 
  
University of Gujrat 
 
 
 
 
EventFit – Smart Outfit Recommendation Website 
 
 
 
 
Students name:        Kinza Bilal (22121519-013) 
                                   Nida Noor  (22121519-015) 
                                   Eman Bibi (22121519-037) 
 
 
 
 
 
Supervisor’s Name :        Mam Sumbla Munir 
 
 
 
 
 
 
 
 
 
 
 
DECLARATION 
I certify that project title   EventFit – Smart Outfit Recommendation Website is under 
my supervision with students of  BS COMPUTER SCIENCE Faculty of Computing & 
Information Technology, University of Gujrat, Pakistan, worked under my supervision. 
Supervisor’s Sumbla Munir  
Department of Computer Science 
Faculty of Computing & Information Technology  
University of Gujrat, Punjab, Pakistan.  
Email:___@uog.edu.pk  
Dated: 3.November, 2025 
© Department of Computer Science 
Faculty of Computing & IT 
University of Gujrat 
2 
FINAL YEAR PROJECT PROPOSAL 
Abstract  
EventFit is an intelligent web-based system that assists users in selecting appropriate 
outfits according to event type, personal preference, and real-time weather conditions. 
It integrates OpenWeatherMap API for weather data and Unsplash API for outfit 
imagery.A built-in StyleBuddy Chat Assistant interacts with users, collects event details, 
and provides instant outfit recommendations.By combining fashion logic, environmental 
context, and artificial intelligence, EventFit enhances decision-making, saves time, and 
improves user confidence. 
1. Introduction 
This proposal defines the functional and non-functional requirements, scope, techniques, 
tools, and platform of the project Event Fit – Smart Outfit Recommendation Website. 
Event Fit is a responsive web platform that uses event type and weather data to generate 
personalized outfit suggestions. 
Functional Requirements: User input via Style Buddy Chat box, weather data retrieval, 
outfit recommendation logic, and result visualization. 
Non-Functional Requirements: Responsiveness, scalability, quick data access, 
usability, and cross-platform performance. 
The project will be developed using React.js (frontend), Node.js/Flask (backend), and 
MongoDB/Firebase (database). 
An iterative development process—analysis, design, implementation, testing, and 
deployment—will be followed.The goal is to deliver a user-friendly, scalable, and 
intelligent fashion-recommendation system that merges design aesthetics with modern 
web technology. 
2. Project Title  
EventFit – Smart Outfit Recommendation Website 
3. Project Overview statement 
EventFit analyzes user-provided information such as event type, gender, and city, and 
combines it with live weather data to recommend context-appropriate outfits.The 
StyleBuddy Chat Assistant makes this interaction conversational and engaging.Backend 
services fetch weather information from OpenWeatherMap API and outfit visuals from 
Unsplash API to ensure accurate and visually appealing results.This integration of web 
technology and smart logic turns EventFit into a practical fashion advisor that adapts to 
user needs and changing environmental factors. 
4. Targeted Audience 
The targeted audience of the EventFit – Smart Outfit Recommendation Website 
includes individuals who frequently attend events such as parties, weddings, corporate 
© Department of Computer Science 
Faculty of Computing & IT 
University of Gujrat 
3 
meetings, or interviews and often face difficulty in deciding what to wear. 
This system is particularly useful for: 
 Students and young professionals who attend formal and informal gatherings 
and want quick outfit guidance. 
 Fashion-conscious users who wish to stay trendy and dress appropriately for 
each event. 
 Working individuals who have limited time to plan suitable attire based on the 
weather. 
 Stylists and clothing retailers who can use the system to understand event-based 
outfit preferences and current fashion trends. 
5. Project Goals & Objectives 
Goals 
 Develop a smart, event-aware, and weather-based outfit recommendation system. 
 Create an interactive chatbot (StyleBuddy) for real-time outfit suggestions. 
Objectives 
In your Objectives section, you write what specific tasks you will perform to achieve 
your project goals. 
Each objective should describe a clear, measurable action — something that can be 
built, tested, or completed during your project. 
6. Application Architecture 
EventFit follows a three-tier architecture: 
 Frontend (React.js): User interface and chatbox. 
 Backend (Node.js/Flask): Business logic and API connections. 
 Database (MongoDB/Firebase): User preferences and outfit data. 
Weather API Integration: Fetches live temperature, humidity, and conditions for outfit 
suitability. 
Unsplash API: Retrieves outfit images that match style and weather. 
© Department of Computer Science 
Faculty of Computing & IT 
University of Gujrat 
4 
7. Hardware and Software Specification 
Hardware 
 Intel Core i5 or higher 
 8 GB RAM 
 500 GB HDD 
Software 
 Windows 10/11 
 Node.js / Python 3.10 
 React.js 
 MongoDB / Firebase 
 Visual Studio Code 
 OpenWeatherMap & Unsplash APIs 
8. Estimated Cost 
Approximate cost: Rs. 20,000 – 30,000 
9. Tools and technologies used with reasoning 
PART                    
Frontend 
TECHNOLOGY 
HTML, CSS, JavaScript, React.js 
Backend 
Node.js / Flask (Python) 
MongoDB / Firebase 
Database 
AI/ML (optional) 
APIs 
Python (scikit-learn / TensorFlow Lite) 
OpenWeatherMap API + Unsplash API 
Hosting 
Vercel / Netlify (frontend), Render / Railway (backend) 
10.Project milestones and deliverables 
PHASE 
DURATION 
Requirement Analysis 
2 Weeks 
DELIVERABLE 
Requirements finalized 
Design Phase 
2 Weeks 
UI/UX and database schema 
Implementation 
6 Weeks 
Testing & Evaluation 
Frontend + Backend + Chatbox integration 
2 Weeks 
Documentation & Submission 2 Weeks 
Bug fixes and validation 
Final report and deployment 
© Department of Computer Science 
Faculty of Computing & IT 
University of Gujrat 
5 
Work division among Group members 
Kinza Bilal – Frontend design & UI development 
Nida Noor – Backend API and database integration   
Eman Bibi – Chatbox logic, testing & documentation 
© Department of Computer Science 
Faculty of Computing & IT 
University of Gujrat 
6


---------------------------------

=> Few

=> Include categories by which the user can get suggestions.

=> Multiple suggestions should be displayed to users (visual suggestion).

=> Visual should be based on model.

→ Picture


----------------------------------


[5:14 AM, 3/1/2026] Mujeeb: Main functional requirements....
1The system should allow users to clear enter details.
2.The system should fetch real-time weather data  using an Api.
The system should process event type and weather conditions.
3. The system should generate suitable outfit
 recommendations.
4. The system should display outfit images to the users.
5. The chatbot should guide users interactively 
 Non functional requirements
1. User friendly 
2. Respond quickly 
3. Secure 
4. Scalable 
5. Responsive on different devices
[5:14 AM, 3/1/2026] Mujeeb: Event out fit


Hum ny agr kisii b event py jna ho toh dress zroor suggest krty k Kon sa choose kryy 
But aik aik styling Hoti hai or aik wearing Jo Mila phn liya 
But hr event k hisab sy choose (  interview, shadi , party , etc...)

(For woman and men outfit )
Based on Pakistani culture
[5:14 AM, 3/1/2026] Mujeeb: Is mn Al ka b choose krna k ...
Humy wo b suggest kr skta hai....

------------------------------------------

## Event Outfit Suggestion System

When we have to attend any event, we usually think about **which dress or outfit we should choose**. Sometimes people simply wear whatever they have, but proper styling is important because **every event requires a different type of outfit**.

For example:

* **Interview**
* **Wedding**
* **Party**
* Other formal or casual events

The system will suggest outfits **according to the type of event**.
It will provide recommendations for **both men and women** and will be **based on Pakistani culture and dressing styles**.

The system may also use **Artificial Intelligence (AI)** to help suggest suitable outfits to users.

---

# Functional Requirements

1. The system should allow users to **enter their details clearly**.
2. The system should **fetch real-time weather data using an API**.
3. The system should **process the event type and weather conditions**.
4. The system should **generate suitable outfit recommendations**.
5. The system should **display outfit images to users**.
6. The chatbot should **guide users interactively**.

---

# Non-Functional Requirements

1. The system should be **user-friendly**.
2. The system should **respond quickly**.
3. The system should be **secure**.
4. The system should be **scalable**.
5. The system should be **responsive on different devices**.

---

If you want, I can also **improve this and convert it into proper FYP/SRS format (like your university documentation requires)** so you can **directly paste it into your report.**
