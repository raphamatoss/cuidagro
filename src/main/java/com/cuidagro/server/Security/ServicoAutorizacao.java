package com.cuidagro.server.Security;

import com.cuidagro.server.DBCommunication.DBLogin;
import com.cuidagro.server.Usuario;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service // Essential!
public class ServicoAutorizacao implements UserDetailsService {
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // If possible, inject DBLogin instead of using static
        Usuario user = DBLogin.login(username);
        if (user == null) throw new UsernameNotFoundException("Usuario nao encontrado.");
        return new UsuarioDetails(user);
    }
}
