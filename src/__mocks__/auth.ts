/** Mock authentication helper used in API route tests */
export const auth = jest.fn(() => ({ 
  user: { 
    id: 'test-user-id', 
    name: 'Test User', 
    email: 'test@example.com',
    role: 'ADMIN'
  } 
}));

