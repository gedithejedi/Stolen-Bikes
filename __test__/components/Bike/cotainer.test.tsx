import Container from "~/components/Bike/Container";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { useQuery } from "@tanstack/react-query";

