/** Mock for the `next-auth` library used in tests */
export default function NextAuth() {
  return {} as any;
}

export const getServerSession = jest.fn(() => ({ user: null }));

