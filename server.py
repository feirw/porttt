from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging first
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="CS Portfolio API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Portfolio Models
class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    status: str = "unread"

class ContactMessageCreate(BaseModel):
    name: str
    email: str
    message: str

class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    technologies: List[str]
    features: List[str]
    github_url: str
    demo_url: str
    status: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Skills(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    languages: List[str]
    frameworks: List[str]
    tools: List[str]
    concepts: List[str]
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class Experience(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    company: str
    position: str
    duration: str
    location: str
    description: str
    achievements: List[str]

class Education(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    degree: str
    university: str
    duration: str
    gpa: str
    relevant_courses: List[str]
    achievements: List[str]

class PersonalInfo(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    title: str
    tagline: str
    bio: str
    email: str
    phone: str
    location: str
    resume_url: str
    social_links: dict
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# Health check endpoint
@api_router.get("/")
async def root():
    return {"message": "CS Portfolio API is running", "version": "1.0.0"}

# Contact Endpoints
@api_router.post("/contact", response_model=ContactMessage)
async def submit_contact_form(contact_data: ContactMessageCreate):
    try:
        contact_message = ContactMessage(**contact_data.dict())
        result = await db.contact_messages.insert_one(contact_message.dict())
        
        if result.inserted_id:
            logger.info(f"New contact message from {contact_data.email}")
            return contact_message
        else:
            raise HTTPException(status_code=500, detail="Failed to save contact message")
    except Exception as e:
        logger.error(f"Error saving contact message: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages():
    try:
        messages = await db.contact_messages.find().sort("timestamp", -1).to_list(100)
        return [ContactMessage(**msg) for msg in messages]
    except Exception as e:
        logger.error(f"Error fetching contact messages: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Projects Endpoints
@api_router.get("/projects", response_model=List[Project])
async def get_projects():
    try:
        projects = await db.projects.find().sort("created_at", -1).to_list(50)
        return [Project(**project) for project in projects]
    except Exception as e:
        logger.error(f"Error fetching projects: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Skills Endpoints
@api_router.get("/skills", response_model=Skills)
async def get_skills():
    try:
        skills_data = await db.skills.find_one()
        if skills_data:
            return Skills(**skills_data)
        else:
            # Return default skills if none found
            default_skills = Skills(
                languages=["JavaScript", "Python", "Java", "C++", "TypeScript", "SQL"],
                frameworks=["React", "Node.js", "Express", "Django", "Spring Boot", "FastAPI"],
                tools=["Git", "Docker", "AWS", "MongoDB", "PostgreSQL", "Redis"],
                concepts=["Data Structures", "Algorithms", "Machine Learning", "System Design", "API Development"]
            )
            await db.skills.insert_one(default_skills.dict())
            return default_skills
    except Exception as e:
        logger.error(f"Error fetching skills: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Experience Endpoints
@api_router.get("/experience", response_model=List[Experience])
async def get_experience():
    try:
        experience_data = await db.experience.find().to_list(20)
        return [Experience(**exp) for exp in experience_data]
    except Exception as e:
        logger.error(f"Error fetching experience: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Education Endpoints
@api_router.get("/education", response_model=Education)
async def get_education():
    try:
        education_data = await db.education.find_one()
        if education_data:
            return Education(**education_data)
        else:
            # Return default education if none found
            default_education = Education(
                degree="Bachelor of Science in Computer Science",
                university="Tech University",
                duration="2022 - 2026",
                gpa="3.8/4.0",
                relevant_courses=[
                    "Data Structures & Algorithms",
                    "Database Systems", 
                    "Software Engineering",
                    "Machine Learning",
                    "Computer Networks",
                    "Operating Systems"
                ],
                achievements=[
                    "Dean's List (3 semesters)",
                    "President of CS Student Association",
                    "Hackathon winner (2 times)"
                ]
            )
            await db.education.insert_one(default_education.dict())
            return default_education
    except Exception as e:
        logger.error(f"Error fetching education: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Personal Info Endpoints
@api_router.get("/personal", response_model=PersonalInfo)
async def get_personal_info():
    try:
        personal_data = await db.personal_info.find_one()
        if personal_data:
            return PersonalInfo(**personal_data)
        else:
            # Return default personal info if none found
            default_personal = PersonalInfo(
                name="Alex Thompson",
                title="Computer Science Student",
                tagline="Building the future with code",
                bio="Passionate CS student with a love for full-stack development, machine learning, and solving complex problems. Currently pursuing my Bachelor's in Computer Science with experience in modern web technologies and algorithms.",
                email="alex.thompson@email.com",
                phone="+1 (555) 123-4567", 
                location="University Campus, Tech City",
                resume_url="/resume.pdf",
                social_links={
                    "github": "https://github.com/alexthompson",
                    "linkedin": "https://linkedin.com/in/alexthompson",
                    "twitter": "https://twitter.com/alexthompson"
                }
            )
            await db.personal_info.insert_one(default_personal.dict())
            return default_personal
    except Exception as e:
        logger.error(f"Error fetching personal info: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Initialize default data endpoint
@api_router.post("/initialize-data")
async def initialize_default_data():
    try:
        # Initialize Projects
        existing_projects = await db.projects.count_documents({})
        if existing_projects == 0:
            default_projects = [
                Project(
                    title="AI-Powered Task Manager",
                    description="A smart task management application that uses machine learning to prioritize tasks and predict completion times. Built with React, Node.js, and TensorFlow.js.",
                    technologies=["React", "Node.js", "TensorFlow.js", "MongoDB", "Express"],
                    features=["Smart prioritization", "Time prediction", "Analytics dashboard", "Real-time sync"],
                    github_url="https://github.com/alexthompson/ai-task-manager",
                    demo_url="https://ai-taskmanager.demo.com",
                    status="completed"
                ),
                Project(
                    title="Distributed Chat System",
                    description="A scalable real-time chat application supporting multiple rooms, file sharing, and video calls. Implemented with microservices architecture.",
                    technologies=["React", "Socket.io", "Redis", "Docker", "Kubernetes"],
                    features=["Real-time messaging", "File sharing", "Video calls", "Message encryption"],
                    github_url="https://github.com/alexthompson/distributed-chat",
                    demo_url="https://chatapp.demo.com",
                    status="completed"
                ),
                Project(
                    title="Algorithm Visualizer",
                    description="Interactive web application for visualizing sorting and pathfinding algorithms. Helps students understand complex algorithms through animations.",
                    technologies=["JavaScript", "Canvas API", "CSS3", "HTML5"],
                    features=["Interactive controls", "Multiple algorithms", "Speed adjustment", "Educational content"],
                    github_url="https://github.com/alexthompson/algo-visualizer",
                    demo_url="https://algovis.demo.com",
                    status="completed"
                ),
                Project(
                    title="Blockchain Voting System", 
                    description="Secure and transparent voting system built on blockchain technology. Ensures vote integrity and anonymity while maintaining transparency.",
                    technologies=["Solidity", "Web3.js", "React", "Ethereum", "IPFS"],
                    features=["Blockchain security", "Anonymous voting", "Real-time results", "Audit trail"],
                    github_url="https://github.com/alexthompson/blockchain-voting",
                    demo_url="https://blockvote.demo.com",
                    status="in-progress"
                )
            ]
            
            for project in default_projects:
                await db.projects.insert_one(project.dict())
            
        # Initialize Experience
        existing_experience = await db.experience.count_documents({})
        if existing_experience == 0:
            default_experience = [
                Experience(
                    company="TechCorp Solutions",
                    position="Software Development Intern",
                    duration="Summer 2024",
                    location="San Francisco, CA",
                    description="Developed and maintained React components for the company's main product dashboard. Collaborated with senior developers on API integration and database optimization.",
                    achievements=[
                        "Improved dashboard loading speed by 40%",
                        "Implemented 15+ reusable React components", 
                        "Contributed to code review process"
                    ]
                ),
                Experience(
                    company="University Research Lab",
                    position="Research Assistant",
                    duration="Sept 2023 - Present",
                    location="University Campus",
                    description="Assisting professors with machine learning research focused on natural language processing and sentiment analysis.",
                    achievements=[
                        "Co-authored 2 research papers",
                        "Developed ML models with 95% accuracy",
                        "Presented findings at student conference"
                    ]
                )
            ]
            
            for exp in default_experience:
                await db.experience.insert_one(exp.dict())
                
        return {"message": "Default data initialized successfully"}
        
    except Exception as e:
        logger.error(f"Error initializing data: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Logging already configured above

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
