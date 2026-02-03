package com.cuidagro.server.Security;

import com.cuidagro.server.DBCommunication.DBLogin;
import com.cuidagro.server.Usuario;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class OurUserDetailsService implements UserDetailsService {
    // username na verdade é o email
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Usuario user = DBLogin.login(username);
        if (user == null) throw new UsernameNotFoundException("Usuario nao encontrado.");

        return new UsuarioDetails(user);
    }
}
