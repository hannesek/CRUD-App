# Använd en officiell .NET 8 runtime-bild som en basbild
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Använd en officiell .NET 8 SDK-bild som en byggbild
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Kopiera allt innehåll från Backend-mappen till Docker
COPY ./Backend/ .

# Återställ beroenden baserat på Backend.csproj
RUN dotnet restore "Backend.csproj"

# Bygg projektet
RUN dotnet build "Backend.csproj" -c Release -o /app/build

# Publicera applikationen
RUN dotnet publish "Backend.csproj" -c Release -o /app/publish

# Använd en runtime-bild och kopiera den publicerade applikationen
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Backend.dll"]
