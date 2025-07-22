package com.tenthousandideas.controller;

import com.tenthousandideas.entity.Bookmark;
import com.tenthousandideas.entity.BusinessIdea;
import com.tenthousandideas.service.BookmarkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookmarks")
@CrossOrigin(origins = "*")
public class BookmarkController {

    @Autowired
    private BookmarkService bookmarkService;

    @GetMapping
    public ResponseEntity<List<BusinessIdea>> getUserBookmarks(@RequestParam Long userId) {
        List<BusinessIdea> bookmarks = bookmarkService.getUserBookmarks(userId);
        return ResponseEntity.ok(bookmarks);
    }

    @PostMapping
    public ResponseEntity<?> addBookmark(@RequestBody Map<String, Object> request) {
        Long userId = Long.valueOf(request.get("userId").toString());
        Long businessIdeaId = Long.valueOf(request.get("businessIdeaId").toString());
        
        try {
            Bookmark bookmark = bookmarkService.addBookmark(userId, businessIdeaId);
            return ResponseEntity.ok(Map.of("success", true, "message", "Bookmark added"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    @DeleteMapping
    public ResponseEntity<Void> removeBookmark(@RequestParam Long userId, @RequestParam Long businessIdeaId) {
        bookmarkService.removeBookmark(userId, businessIdeaId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/toggle")
    public ResponseEntity<Map<String, Object>> toggleBookmark(@RequestBody Map<String, Object> request) {
        Long userId = Long.valueOf(request.get("userId").toString());
        Long businessIdeaId = Long.valueOf(request.get("businessIdeaId").toString());
        
        try {
            boolean added = bookmarkService.toggleBookmark(userId, businessIdeaId);
            return ResponseEntity.ok(Map.of(
                "success", true, 
                "bookmarked", added,
                "message", added ? "Bookmark added" : "Bookmark removed"
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    @GetMapping("/check")
    public ResponseEntity<Map<String, Boolean>> isBookmarked(@RequestParam Long userId, @RequestParam Long businessIdeaId) {
        boolean bookmarked = bookmarkService.isBookmarked(userId, businessIdeaId);
        return ResponseEntity.ok(Map.of("bookmarked", bookmarked));
    }
}