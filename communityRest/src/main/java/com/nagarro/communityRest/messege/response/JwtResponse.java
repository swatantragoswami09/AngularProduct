package com.nagarro.communityRest.messege.response;

public class JwtResponse {
    private String token;
    private String username;

    public JwtResponse(String token, String username) {
        this.username = username;
        this.token = token;
    }

    public String getAccessToken() {
        return token;
    }

    public void setAccessToken(String accessToken) {
        this.token = accessToken;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

}