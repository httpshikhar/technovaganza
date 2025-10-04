export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const EVENT_TYPES = {
  SOLO: 'solo',
  TEAM: 'team'
};

export const MAX_EVENTS_PER_USER = 3;
export const MAX_TEAM_SIZE = 5;

export const BRANCHES = [
  'Computer Science & Engineering',
  'Information Technology',
  'Electronics & Communication Engineering',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Chemical Engineering',
  'Biotechnology',
  'MCA',
  'MBA',
  'BBA',
  'B.Com',
  'B.Sc',
  'MBBS',
  'BDS',
  'B.Pharma',
  'D.Pharma',
  'B.Sc Nursing',
  'GNM Nursing',
  'Other'
];

export const BATCHES = [
  '2020-2024',
  '2021-2025',
  '2022-2026',
  '2023-2027',
  '2024-2028',
  '2025-2029'
];

export const COLLEGES = [
  'SRMS CET & R',
  'SRMS CET', 
  'SRMS IMS',
  'SRMS Nursing',
  'SRMS IPS',
  'KCMT'
];