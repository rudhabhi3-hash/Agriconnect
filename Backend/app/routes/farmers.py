from fastapi import APIRouter, HTTPException
from app.services.supabase_client import supabase

router = APIRouter()


# GET ALL FARMERS
@router.get("/farmers")
def get_farmers():
    response = supabase.table("farmers").select("*").execute()

    return {
        "success": True,
        "data": response.data
    }


# GET FARMER BY ID
@router.get("/farmers/{farmer_id}")
def get_farmer(farmer_id: int):
    response = (
        supabase
        .table("farmers")
        .select("*")
        .eq("id", farmer_id)
        .execute()
    )

    if not response.data:
        raise HTTPException(
            status_code=404,
            detail="Farmer not found"
        )

    return {
        "success": True,
        "data": response.data[0]
    }