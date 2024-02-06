package com.quiztech.categoryservice.security;

import com.nimbusds.jwt.JWTClaimNames;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Configuration
@RequiredArgsConstructor
public class AuthConverter implements Converter<Jwt, AbstractAuthenticationToken> {

    private final JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter;
    private AuthProperties properties;

    @Override
    public AbstractAuthenticationToken convert(Jwt jwt) {
        Collection<GrantedAuthority> roles= Stream.concat(
                jwtGrantedAuthoritiesConverter.convert(jwt).stream(),
                extractRoles(jwt).stream()
        ).collect(Collectors.toSet());

        return new JwtAuthenticationToken(jwt, roles, getClaimName(jwt));
    }

    public String getClaimName(Jwt jwt) {
        String claimName= JWTClaimNames.SUBJECT;

        if (!Objects.isNull(properties.getPrincipalAttribute())) {
            claimName= properties.getPrincipalAttribute();
        }

        return claimName;
    }

    public Collection<GrantedAuthority> extractRoles (Jwt jwt) {
        Map<String, Object> resourceAccess= jwt.getClaim("resource_access");
        Map<String, Object> resourceRoles;
        Collection<String> roles;

        if (Objects.isNull(resourceAccess)
                    || (Objects.isNull(resourceRoles= (Map<String, Object>) resourceAccess.get(properties.getResourceId())))
                    || (Objects.isNull(roles= (Collection<String>) resourceRoles.get("roles")))) {

            return Set.of();
        }

        return roles.stream()
                .map(role-> new SimpleGrantedAuthority("ROLE_"+role))
                .collect(Collectors.toSet());
    }
}
