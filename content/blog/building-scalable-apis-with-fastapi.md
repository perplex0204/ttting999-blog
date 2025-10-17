---
title: 'Building Scalable APIs with FastAPI and PostgreSQL'
description: 'A comprehensive guide to building production-ready REST APIs using FastAPI, PostgreSQL, and modern Python best practices.'
date: '2025-01-15'
tags: ['Python', 'FastAPI', 'PostgreSQL', 'Backend', 'API Design']
category: '技術'
author: 'Ting Zhang'
image: ''
draft: false
---

# Building Scalable APIs with FastAPI and PostgreSQL

FastAPI has quickly become my go-to framework for building high-performance APIs in Python. After working with Flask for years, the switch to FastAPI was a game-changer. Here's why and how to build scalable APIs with it.

## Why FastAPI?

FastAPI offers several advantages that make it perfect for modern API development:

- **Performance**: Built on Starlette and Pydantic, it's one of the fastest Python frameworks available
- **Type Safety**: Leverages Python type hints for automatic validation and documentation
- **Async Support**: Native async/await support for handling concurrent requests
- **Auto Documentation**: Automatic OpenAPI and JSON Schema generation

## Project Setup

Let's start by setting up a basic FastAPI project with PostgreSQL:

```python
# requirements.txt
fastapi==0.109.0
uvicorn[standard]==0.27.0
sqlalchemy==2.0.25
psycopg2-binary==2.9.9
pydantic-settings==2.1.0
```

Install dependencies:

```bash
pip install -r requirements.txt
```

## Database Configuration

Create a database configuration using SQLAlchemy 2.0:

```python
# app/database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str = "postgresql://user:password@localhost/mydb"

    class Config:
        env_file = ".env"

settings = Settings()

engine = create_engine(
    settings.database_url,
    pool_size=10,
    max_overflow=20,
    pool_pre_ping=True
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

## Creating Models

Define your SQLAlchemy models with proper relationships:

```python
# app/models.py
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    posts = relationship("Post", back_populates="author")

class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    author_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)

    author = relationship("User", back_populates="posts")
```

## Pydantic Schemas

Create Pydantic schemas for request/response validation:

```python
# app/schemas.py
from pydantic import BaseModel, EmailStr
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    username: str

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class PostBase(BaseModel):
    title: str
    content: str

class PostCreate(PostBase):
    pass

class PostResponse(PostBase):
    id: int
    author_id: int
    created_at: datetime

    class Config:
        from_attributes = True
```

## Building the API

Create your FastAPI application with CRUD operations:

```python
# app/main.py
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db, engine, Base
from app import models, schemas

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="My API", version="1.0.0")

@app.post("/users/", response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Check if user exists
    db_user = db.query(models.User).filter(
        models.User.email == user.email
    ).first()

    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Create new user
    db_user = models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/users/{user_id}", response_model=schemas.UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    return db_user

@app.get("/users/", response_model=List[schemas.UserResponse])
def list_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = db.query(models.User).offset(skip).limit(limit).all()
    return users
```

## Performance Optimization Tips

### 1. Connection Pooling

Always configure connection pooling properly:

```python
engine = create_engine(
    database_url,
    pool_size=10,          # Number of persistent connections
    max_overflow=20,        # Additional connections on demand
    pool_pre_ping=True,    # Test connections before using
    pool_recycle=3600      # Recycle connections after 1 hour
)
```

### 2. Async Endpoints

For I/O-bound operations, use async endpoints:

```python
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession

@app.get("/users/{user_id}")
async def get_user_async(user_id: int, db: AsyncSession = Depends(get_async_db)):
    result = await db.execute(select(User).filter(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
```

### 3. Query Optimization

Use `joinedload` to avoid N+1 queries:

```python
from sqlalchemy.orm import joinedload

@app.get("/posts/")
def list_posts(db: Session = Depends(get_db)):
    posts = db.query(Post).options(
        joinedload(Post.author)
    ).all()
    return posts
```

## Conclusion

FastAPI combined with PostgreSQL provides a solid foundation for building scalable APIs. Key takeaways:

- Leverage type hints for automatic validation
- Configure connection pooling appropriately
- Use async for I/O-bound operations
- Optimize queries to avoid N+1 problems
- Let FastAPI handle the documentation automatically

The combination of these tools has helped me build APIs that handle thousands of requests per second while maintaining clean, type-safe code.

Have you tried FastAPI? What's your experience been like? Feel free to reach out if you have questions!
