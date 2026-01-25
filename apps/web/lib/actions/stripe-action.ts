export const stripeConnectAction = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_URL}/stripe/connect`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
      credentials: "include",
    },
  );
  if (!response.ok) {
    const error = await response.json();
    throw error;
  }
  return response.json();
};
