from fastapi import APIRouter
from app.services.supabase_client import supabase

router = APIRouter()


@router.get("/crops")
def get_crops():
    response = supabase.table("crops").select("*").execute()

    return {
        "success": True,
        "data": response.data
    }