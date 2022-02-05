import NextAuth from "next-auth"

export default NextAuth({
    providers: [
      {
        id: "asgardeo",
        name: "Asgardeo",
        clientId: process.env.ASGARDEO_CLIENT_ID,
        clientSecret: process.env.ASGARDEO_CLIENT_SECRET,
        type: "oauth",
        wellKnown: "https://api.asgardeo.io/t/" + process.env.ASGARDEO_ORGANIZATION_NAME + "/oauth2/token/.well-known/openid-configuration",
        authorization: { params: { scope: process.env.ASGARDEO_SCOPES } },
        idToken: true,
        checks: ["pkce", "state"],
        async profile(profile, tokens) {
            const config = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${tokens.access_token}`
                },
            }
    
            const response = await fetch("https://api.asgardeo.io/t/" + process.env.ASGARDEO_ORGANIZATION_NAME + "/oauth2/userinfo", config);
    
            const userResponse = await response.json();
            
            return {
                id: userResponse?.sub,
                name: userResponse?.given_name.trim(),
                email: userResponse?.email,
                image: userResponse?.profile
            }
        },
      },
    ],
    secret: process.env.SECRET,
  
    session: {
      strategy: "jwt",
    },
    callbacks: {
    //   async session({ session, token, user }) {
    //     if(token?.accessToken) {
    //         session.accessToken = token.accessToken
    //         session.idToken = token.idToken
    
    //         const config = {
    //             method: 'GET',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json',
    //                 'authorization': 'Bearer '+session.accessToken
    //             },
    //         }
    
    //         const response = await fetch("https://api.asgardeo.io/t/" + process.env.ASGARDEO_ORGANIZATION_NAME + "/oauth2/userinfo", config);
    
    //         const userResponse = await response.json();
            
    //         const userData = {
    //             sub: userResponse?.sub,
    //             name: `${userResponse?.given_name} ${userResponse?.family_name}`.trim(),
    //             email: userResponse?.email,
    //             image: userResponse?.profile
    //         }
    
    //         session.user = userData;
    //     } else {
    //         session = {};
    //     }
  
    //     return session
    //   },
    //   async jwt({ token, user, account, profile, isNewUser }) {
    //     if (account) {
    //       token.accessToken = account.access_token
    //       token.idToken = account.id_token
    //     }
  
    //     return token
    //   }
    },
  })
  