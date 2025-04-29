package site_ouzi.vente_p2p.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import site_ouzi.vente_p2p.DTO.ItemForSaleDTO;
import site_ouzi.vente_p2p.entity.ItemForSale;
import site_ouzi.vente_p2p.entity.User;
import site_ouzi.vente_p2p.repository.ItemRepository;
import site_ouzi.vente_p2p.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;
    @Autowired
    private UserRepository userRepository;

    public List<ItemForSale> getAllItems() {
        return itemRepository.findAll();
    }

    public Optional<ItemForSale> getItemById(Long id) {
        return itemRepository.findById(id);
    }

    public List<ItemForSale> getItemsByLogin(String login) {
        return itemRepository.findByUserLogin(login);
    }

    public ItemForSale createItemForSale(ItemForSaleDTO request, String login) {
        User user = userRepository.findByLogin(login);
        ItemForSale itemForSale = new ItemForSale();
        itemForSale.setDescription(request.getDescription());
        itemForSale.setPrice(request.getPrice());
        itemForSale.setUser(user);
        itemForSale.setSold(false);

        return itemRepository.save(itemForSale);
    }

    public ItemForSale SoldItem(Long id) {
        Optional<ItemForSale> optionalItem = itemRepository.findById(id);
        if (optionalItem.isPresent()) {
            ItemForSale item = optionalItem.get();
            item.setSold(true);
            return itemRepository.save(item);
        }
        return null;
    }

    public void deleteItem(Long id) {
        itemRepository.deleteById(id);
    }
}
