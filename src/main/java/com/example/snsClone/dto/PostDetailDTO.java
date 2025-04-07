package com.example.snsClone.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class PostDetailDTO {

    private Long postID;
    private String imageURL;
    private int likes;
    private boolean isLiked;
    private LocalDateTime createdAt;
    private String context;
    private List<CommentDTO> comments;

    public PostDetailDTO(Long postID, String imageURL, int likes, boolean isLiked,
                         LocalDateTime createdAt, String context, List<CommentDTO> comments) {
        this.postID = postID;
        this.imageURL = imageURL;
        this.likes = likes;
        this.isLiked = isLiked;
        this.createdAt = createdAt;
        this.context = context;
        this.comments = comments;

    }


}
