package com.demo.back.getuserinfo;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(GetUserInfoController.class)
@TestPropertySource(properties = {
        "demo.user.name=james",
        "demo.user.age=26",
        "demo.user.phone=01011112222",
        "demo.user.signup-date=2024-03-15",
        "demo.user.signup-ip=192.168.0.10",
        "demo.user.device-os=Windows 11"
})
class GetUserInfoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void apiUserInfoEndpointReturnsUserAndSignupInformation() throws Exception {
        mockMvc.perform(get("/api/user-info"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("james"))
                .andExpect(jsonPath("$.age").value(26))
                .andExpect(jsonPath("$.phone").value("01011112222"))
                .andExpect(jsonPath("$.signupDate").value("2024-03-15"))
                .andExpect(jsonPath("$.signupIp").value("192.168.0.10"))
                .andExpect(jsonPath("$.deviceOs").value("Windows 11"));
    }

    @Test
    void getuserinfoEndpointReturnsUserAndSignupInformation() throws Exception {
        mockMvc.perform(get("/getuserinfo"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("james"))
                .andExpect(jsonPath("$.age").value(26))
                .andExpect(jsonPath("$.phone").value("01011112222"))
                .andExpect(jsonPath("$.signupDate").value("2024-03-15"))
                .andExpect(jsonPath("$.signupIp").value("192.168.0.10"))
                .andExpect(jsonPath("$.deviceOs").value("Windows 11"));
    }
}
