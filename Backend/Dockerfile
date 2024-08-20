# Använd en officiell .NET 8 runtime-bild som en basbild
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Använd en officiell .NET 8 SDK-bild som en byggbild
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Kopiera hela Backend-mappen till Docker
COPY Backend/ /src/Backend/

# Navigera till mappen där Backend.csproj ligger och återställ beroenden
WORKDIR /src/Backend
RUN dotnet restore "Backend.csproj"

# Bygg projektet
RUN dotnet build "Backend.csproj" -c Release -o /app/build

# Publicera applikationen
FROM build AS publish
RUN dotnet publish "Backend.csproj" -c Release -o /app/publish

# Konfigurera basbilden för att köra applikationen
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Backend.dll"]
