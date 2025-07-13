module.exports = async (req, res) => {
  const APP_ID = process.env.APP_ID || "771512691871130"; // Из переменных окружения
  const REDIRECT_URI =
    "https://vercel-tokens-catcher.vercel.app/api/ig-webhook";
  const SCOPES = [
    "instagram_business_basic",
    "instagram_business_manage_insights",
  ].join(",");

  const params = new URLSearchParams({
    client_id: APP_ID,
    redirect_uri: REDIRECT_URI,
    scope: SCOPES,
    response_type: "code",
    display: "popup",
  });

  const authUrl = `https://www.instagram.com/oauth/authorize?${params.toString()}`;

  console.log(authUrl);
};
