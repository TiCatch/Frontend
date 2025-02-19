export const getSectionSeats = async (ticketingId: string, section: string) => {
  try {
    const response = await fetch(`/api/ticket/seats/${ticketingId}/${section}`);
    if (!response.ok) throw new Error('에러발생');

    const result = await response.json();
    return result.data || {};
  } catch (error) {
    console.error(error);
    return {};
  }
};
