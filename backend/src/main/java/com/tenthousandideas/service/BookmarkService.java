package com.tenthousandideas.service;

import com.tenthousandideas.entity.Bookmark;
import com.tenthousandideas.entity.BusinessIdea;
import com.tenthousandideas.entity.User;
import com.tenthousandideas.repository.BookmarkRepository;
import com.tenthousandideas.repository.BusinessIdeaRepository;
import com.tenthousandideas.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookmarkService {

    @Autowired
    private BookmarkRepository bookmarkRepository;

    @Autowired
    private BusinessIdeaRepository businessIdeaRepository;

    @Autowired
    private UserRepository userRepository;

    public List<BusinessIdea> getUserBookmarks(Long userId) {
        List<Bookmark> bookmarks = bookmarkRepository.findByUser_Id(userId);
        return bookmarks.stream()
                .map(Bookmark::getBusinessIdea)
                .collect(Collectors.toList());
    }

    public boolean isBookmarked(Long userId, Long businessIdeaId) {
        return bookmarkRepository.existsByUser_IdAndBusinessIdea_Id(userId, businessIdeaId);
    }

    public Bookmark addBookmark(Long userId, Long businessIdeaId) {
        Optional<Bookmark> existingBookmark = bookmarkRepository.findByUser_IdAndBusinessIdea_Id(userId, businessIdeaId);
        
        if (existingBookmark.isPresent()) {
            return existingBookmark.get();
        }

        Optional<User> user = userRepository.findById(userId);
        Optional<BusinessIdea> businessIdea = businessIdeaRepository.findById(businessIdeaId);
        
        if (user.isPresent() && businessIdea.isPresent()) {
            Bookmark bookmark = new Bookmark(user.get(), businessIdea.get());
            return bookmarkRepository.save(bookmark);
        }
        
        throw new RuntimeException("User or Business Idea not found");
    }

    public void removeBookmark(Long userId, Long businessIdeaId) {
        bookmarkRepository.deleteByUser_IdAndBusinessIdea_Id(userId, businessIdeaId);
    }

    public boolean toggleBookmark(Long userId, Long businessIdeaId) {
        Optional<Bookmark> existingBookmark = bookmarkRepository.findByUser_IdAndBusinessIdea_Id(userId, businessIdeaId);
        
        if (existingBookmark.isPresent()) {
            bookmarkRepository.delete(existingBookmark.get());
            return false; // Bookmark removed
        } else {
            addBookmark(userId, businessIdeaId);
            return true; // Bookmark added
        }
    }
}