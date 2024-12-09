    #Feature Flag 
    FEATURE_FLAGS = 
        { 
            "EMBEDDED_SUPERSET": True
        }
    
    # CORS Enabling 
    ENABLE_CORS = True 
    CORS_OPTIONS = 
        { 
            "supports_credentials": True, 
            "allow_headers": "*", 
            "expose_headers": "*", 
            "resources": "*", 
            "origins": ["http://localhost:4200","http://localhost:3000"] //4200 for angular , 3000 for react  
        }
            
    
    # Dashboard embedding 
    GUEST_ROLE_NAME = "Gamma" 
    GUEST_TOKEN_JWT_SECRET = "PASTE_GENERATED_SECRET_HERE" 
    GUEST_TOKEN_JWT_ALGO = "HS256" 
    GUEST_TOKEN_HEADER_NAME = "X-GuestToken" 
    GUEST_TOKEN_JWT_EXP_SECONDS = 300 # 5 minutes