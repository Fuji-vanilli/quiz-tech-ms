package com.quiztech.userservice.security;

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

import java.util.Collection;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Configuration
@RequiredArgsConstructor
public class JwtAuthConverter implements Converter<Jwt, AbstractAuthenticationToken> {
    private final JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter;
    private final AuthConverterProperties properties;

    @Override
    public AbstractAuthenticationToken convert(Jwt jwt) {
        Collection<? extends GrantedAuthority> authorities= Stream.concat(
                jwtGrantedAuthoritiesConverter.convert(jwt).stream(),
                extractRoles(jwt).stream()
        ).collect(Collectors.toSet());

        return new JwtAuthenticationToken(jwt, authorities, getClaimName(jwt));
    }

    public String getClaimName(Jwt jwt) {
        String claimName= JWTClaimNames.SUBJECT;
        if (!Objects.isNull(properties.getPrincipalAttribute()))
            claimName= properties.getPrincipalAttribute();

        return jwt.getClaim(claimName);
    }

    public Collection<? extends GrantedAuthority> extractRoles(Jwt jwt) {
        Map<String, Object> resourceId= jwt.getClaim("resource_id");
        Map<String, Object> resource;
        Collection<String> resourceRoles;

        if (Objects.isNull(resourceId)
            || Objects.isNull(resource= (Map<String, Object>) resourceId.get(properties.getResourceId()))
            || Objects.isNull(resourceRoles= (Collection<String>) resource.get("roles"))) {

            return Set.of();
        }

        return resourceRoles.stream()
                .map(role-> new SimpleGrantedAuthority("ROLE_"+role))
                .collect(Collectors.toSet());
    }
}
