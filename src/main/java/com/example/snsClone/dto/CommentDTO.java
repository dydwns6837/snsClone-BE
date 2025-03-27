package com.example.snsClone.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentDTO {

    private Long commentID;
    private String user;
    private String context;

    public CommentDTO(Long commentID, String user, String context) {
        this.commentID = commentID;
        this.user = user;
        this.context = context;
    }
}
