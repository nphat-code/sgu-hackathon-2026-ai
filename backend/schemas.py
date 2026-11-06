"""
UrbanShield Lite - Request & Response Schemas
Pydantic V2 compliant schemas with json_schema_extra.
"""

from typing import Optional
from pydantic import BaseModel, Field


class FloodIncidentPayload(BaseModel):
    node_id: str = Field(..., json_schema_extra={"example": "hem_254_q4"})
    depth_cm: float = Field(..., ge=0.0, le=100.0, json_schema_extra={"example": 22.5})
    level: Optional[str] = Field(None, json_schema_extra={"example": "DANGER"})
    timestamp: Optional[int] = Field(None, json_schema_extra={"example": 1729145700})


class AccidentIncidentPayload(BaseModel):
    node_id: str = Field(..., json_schema_extra={"example": "hem_180_q4"})
    stationary_sec: float = Field(..., ge=0.0, json_schema_extra={"example": 5.2})
    vehicle: str = Field(default="motorcycle", json_schema_extra={"example": "motorcycle"})
    timestamp: Optional[int] = Field(None, json_schema_extra={"example": 1729145810})


class ScenarioPayload(BaseModel):
    scenario: str


class FallTestPayload(BaseModel):
    action: str = "start"  # 'start' | 'cancel'


class TelegramAlertPayload(BaseModel):
    incident_id: str
    node_id: Optional[str] = None

