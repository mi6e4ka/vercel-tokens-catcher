module.exports = async (req, res) => {
  const APP_ID = process.env.APP_ID || "771512691871130"; // Из переменных окружения
  const REDIRECT_URI =
    "https://vercel-tokens-catcher.vercel.app/api/fb-webhook";
  const SCOPES = [
    "pages_show_list",
    "business_management",
    "instagram_basic",
    "instagram_manage_insights",
    "pages_read_engagement",
  ].join(",");

  const params = new URLSearchParams({
    client_id: APP_ID,
    redirect_uri: REDIRECT_URI,
    scope: SCOPES,
    response_type: "code",
    display: "popup",
  });

  const authUrl = `https://www.facebook.com/v23.0/dialog/oauth?${params.toString()}`;

  console.log(authUrl);

  res.redirect(302, authUrl);
};
