package org.npeonelove.backend.dto.chat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatSession {
    private ResumeDTO resume;
    private VacancyDTO vacancy;
    private List<ChatMessage> chatHistory;
    private LocalDateTime createdAt;

    public ChatSession(ResumeDTO resume, VacancyDTO vacancy) {
        this.resume = resume;
        this.vacancy = vacancy;
        this.chatHistory = new ArrayList<>();
        this.createdAt = LocalDateTime.now();
    }

    public void addToHistory(String userMessage, String aiResponse) {
        this.chatHistory.add(new ChatMessage("user", userMessage));
        this.chatHistory.add(new ChatMessage("assistant", aiResponse));
    }
}
