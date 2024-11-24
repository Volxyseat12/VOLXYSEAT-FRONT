FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copie o arquivo .csproj e restaure as dependências
COPY ["VOLXYSEAT.API/VOLXYSEAT.API.csproj", "VOLXYSEAT.API/"]
RUN ls -la VOLXYSEAT.API
RUN dotnet restore "VOLXYSEAT.API/VOLXYSEAT.API.csproj"

# Copie o restante dos arquivos e construa a aplicação
COPY . .
WORKDIR "/src/VOLXYSEAT.API"
RUN dotnet build "VOLXYSEAT.API.csproj" -c Release -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "VOLXYSEAT.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "VOLXYSEAT.API.dll"]
# docker compose -f docker-compose.yml -f docker-compose-override.yml build volxyseat.api
# docker compose -f docker-compose.yml -f docker-compose-override.yml up -d volxyseat.api