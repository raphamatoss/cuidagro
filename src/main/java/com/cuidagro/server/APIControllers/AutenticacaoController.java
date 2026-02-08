package com.cuidagro.server.APIControllers;
import com.cuidagro.server.DBCommunication.DBLogin;
import com.cuidagro.server.DBCommunication.DBRegister;
import com.cuidagro.server.APIControllers.DTOs.AutenticacaoDTO;
import com.cuidagro.server.APIControllers.DTOs.AuthResponseDTO;
import com.cuidagro.server.APIControllers.DTOs.RegisterDTO;
import com.cuidagro.server.Medico;
import com.cuidagro.server.Security.TokenService;
import com.cuidagro.server.Security.UsuarioDetails;
import com.cuidagro.server.Usuario;
import com.cuidagro.server.enums.PapelUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
public class AutenticacaoController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody AutenticacaoDTO data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.senha());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.gerarToken(((UsuarioDetails) auth.getPrincipal()).getUsuario());

        return ResponseEntity.ok(new AuthResponseDTO(token));
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody RegisterDTO data) {
        if (DBLogin.login(data.email()) != null) return ResponseEntity.badRequest().build();

        boolean sucess = false;

        String senhaCriptografada = new BCryptPasswordEncoder().encode(data.senha());
        System.out.println(data.papel().toString());
        if (data.papel() != PapelUsuario.MEDICO) {
            Usuario user = new Usuario(data.nome(), data.cpf(), data.dataNascimento(), data.email(), data.numero(), senhaCriptografada, data.papel());
            sucess = DBRegister.persistirUsuario(user);
        }
        else {
            Medico medico = new Medico(data.nome(), data.cpf(), data.dataNascimento(), data.crm(), data.especialidade(), data.email(), data.numero(), senhaCriptografada, data.papel());
            sucess = DBRegister.persistirMedico(medico);
        }
        if (!sucess) return ResponseEntity.badRequest().build();
        return ResponseEntity.ok().build();
    }
}
