package site_ouzi.vente_p2p.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import site_ouzi.vente_p2p.DTO.ItemForSaleDTO;
import site_ouzi.vente_p2p.entity.ItemForSale;
import site_ouzi.vente_p2p.service.ItemService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/items")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping
    public List<ItemForSale> getAllItems() {
        return itemService.getAllItems();
    }

    @GetMapping("/{id}")
    public Optional<ItemForSale> getItemById(@PathVariable Long id) {
        return itemService.getItemById(id);
    }

    @GetMapping("/my")
    public ResponseEntity<List<ItemForSale>> getItemsByLogin(@RequestHeader("login") String login) {
        List<ItemForSale> items = itemService.getItemsByLogin(login);
        return ResponseEntity.ok(items);
    }

    @PostMapping("/create")
    public ResponseEntity<ItemForSale> createItemForSale(
            @RequestBody ItemForSaleDTO request,
            @RequestHeader("login") String login) {
        ItemForSale itemForSale  = itemService.createItemForSale(request, login);
        return ResponseEntity.ok(itemForSale);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ItemForSale> SoldItem(@PathVariable Long id) {
        ItemForSale updatedItem = itemService.SoldItem(id);
        if (updatedItem != null) {
            return ResponseEntity.ok(updatedItem);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable Long id) {
        itemService.deleteItem(id);
    }
}
