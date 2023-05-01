const GetAvgRating = (length, data) => {
  const totalReviews = length;
  let totalRates = 0;
  data.map((review) => {
    totalRates += review.rate;
  });
  return Math.round(totalRates / totalReviews);
};

export default GetAvgRating;
